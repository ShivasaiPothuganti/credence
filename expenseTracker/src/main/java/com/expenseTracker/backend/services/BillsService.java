package com.expenseTracker.backend.services;

import com.expenseTracker.backend.entities.BillsEntity;
import com.expenseTracker.backend.repositories.BillsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BillsService {

    private BillsRepository billsRepository;

    @Autowired
    public BillsService(BillsRepository billsRepository){
        this.billsRepository = billsRepository;
    }

    public BillsEntity addBill(BillsEntity newbill){
        newbill.setStatus(true);
       BillsEntity savedBill = billsRepository.save(newbill);
       return savedBill;
    }

    public List<BillsEntity> getRecentActiveBills(long numberOfBills,long userId){
        List<BillsEntity> recentBills = billsRepository.getRecentActiveBills(numberOfBills,userId);
        return recentBills;
    }

    public List<BillsEntity> getBills(long userId){
        List<BillsEntity> bills = billsRepository.findByUserId(userId);
        return bills;
    }


    @Transactional
    public void toggleBillStatus(long billId) throws Exception{

        try{
            int updatedRows = billsRepository.toggleBillStatus(billId);
        }
        catch (Error error){
            error.printStackTrace();
            throw new Exception("unable to change the status of the bill");
        }

    }


    public void deleteBill(long billId) throws Exception{
        try{
            billsRepository.deleteById(billId);
        }
        catch (Error e){
            throw new Exception("unable to delete the bill");
        }

    }

}
