package com.expenseTracker.backend.controllers;

import com.expenseTracker.backend.Configuration.Security.JwtService;
import com.expenseTracker.backend.customExceptions.UserNameExistsException;
import com.expenseTracker.backend.entities.UserEntity;
import com.expenseTracker.backend.models.JwtTokenResponse;
import com.expenseTracker.backend.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authenticate")
public class AuthenticationController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody UserEntity user){
        System.out.println(user);
       authenticationManager.authenticate(
               new UsernamePasswordAuthenticationToken(
                       user.getUserEmail(),
                       user.getPassword()
               )
       );
       String token = jwtService.generateToken(user);
        JwtTokenResponse jwt = new JwtTokenResponse();
        jwt.setToken(token);
       return new ResponseEntity<>(jwt,HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> userRegister(@RequestBody UserEntity user){
        try{
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.registerUser(user);
            String token = jwtService.generateToken(user);
            return new ResponseEntity<String>(token,HttpStatus.OK);
        }
        catch (UserNameExistsException exc){
            return new ResponseEntity<String>("User with this gmail already exists",HttpStatus.ALREADY_REPORTED);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<String>("failed to register the user",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
