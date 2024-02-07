package com.expenseTracker.backend.controllers;

import com.expenseTracker.backend.entities.BillsEntity;
import com.expenseTracker.backend.entities.UserEntity;
import com.expenseTracker.backend.models.ErrorResponse;
import com.expenseTracker.backend.services.BillsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
public class BillsController {

    private BillsService billsService;

    public BillsController(BillsService billsService){
        this.billsService = billsService;
    }

    @PostMapping("/")
    public ResponseEntity<?> addBills(@RequestBody BillsEntity newBill,Authentication authenticationObject){
        try{
            UserEntity user = (UserEntity)authenticationObject.getPrincipal();
            newBill.setUserId(user.getUserId());
           BillsEntity savedBill = billsService.addBill(newBill);
            return new ResponseEntity<>(savedBill, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getBillsByUserId(Authentication authenticationObj){

        UserEntity authenticatedUser = (UserEntity)authenticationObj.getPrincipal();
        try{
            List<BillsEntity> bills = billsService.getBills(authenticatedUser.getUserId());
            return new ResponseEntity<>(bills,HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/recentBills/{numberOfBills}")
    public ResponseEntity<?> getRecentActiveBills(@PathVariable("numberOfBills") long numberOfBills,Authentication authenticationObject ){
        UserEntity authenticatedUser = (UserEntity)authenticationObject.getPrincipal();
        try{
            List<BillsEntity> bills = billsService.getRecentActiveBills(numberOfBills,authenticatedUser.getUserId());
            return new ResponseEntity<>(bills,HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>("cannot fetch the bills",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> toggleBillStatus(@PathVariable("id") long id){
        try{
            billsService.toggleBillStatus(id);
            return new ResponseEntity<>("toggled successfully",HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Cannot toggle the bill status"+id,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBill(@PathVariable("id") long id){
        try{
            billsService.deleteBill(id);
            return new ResponseEntity<>("deleted successfully",HttpStatus.OK);
        }
        catch (Exception exc){
            return new ResponseEntity<>("error, cannot delete the bill "+id,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
