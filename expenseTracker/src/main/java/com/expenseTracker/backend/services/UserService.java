package com.expenseTracker.backend.services;

import com.expenseTracker.backend.customExceptions.UserNameExistsException;
import com.expenseTracker.backend.customExceptions.UserNotFoundException;
import com.expenseTracker.backend.entities.UserEntity;
import com.expenseTracker.backend.models.UserDetails;
import com.expenseTracker.backend.repositories.UserRepository;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private UserRepository userRepository;
    private CategoriesService categoriesService;

    public UserService(UserRepository userRepository,CategoriesService categoriesService){
        this.categoriesService = categoriesService;
        this.userRepository = userRepository;
    }
    
    //register the user
    @Transactional
    public UserEntity registerUser(UserEntity user) throws UserNameExistsException {
    	UserEntity existingUser = this.getUserByUsername(user.getUserName());
    	if(existingUser!=null) {
			throw new UserNameExistsException("Username already found");
		}
        UserEntity saved_user = userRepository.save(user);
        categoriesService.addCategory(user.getUserId());
        return saved_user;
    }

    public UserDetails getUserDetails(String userEmail) throws Exception {
        Optional<UserEntity> result = userRepository.findByUserEmail(userEmail);
        UserDetails userDetails = null;
        if(result.isPresent()){

                UserEntity userEntity = result.get();
                userDetails = new UserDetails();
                userDetails.setUserName(userEntity.getUserName());
                userDetails.setGender(userEntity.getGender());
                userDetails.setUserId(userEntity.getUserId());
                userDetails.setUserEmail(userEntity.getUserEmail());
                return userDetails;
        }
        else{
            throw new Exception("userNot found");
        }

    }

    // login the user
    public UserEntity userLogin(UserEntity user) throws UserNotFoundException {
       Optional<UserEntity> result =  userRepository.findByUserNameAndPassword(user.getUserName(),user.getPassword());
       if(result.isPresent()){
           return result.get();
       }
       else{
           throw new UserNotFoundException("Wrong credentials");
       }
    }


    //get the user by username
    public UserEntity getUserByUsername(String username) {
 	   Optional<UserEntity> user = userRepository.findByUserName(username);

 	   if(user.isPresent())
 		   return user.get();
 	   else
 		   return null;
    }


}
