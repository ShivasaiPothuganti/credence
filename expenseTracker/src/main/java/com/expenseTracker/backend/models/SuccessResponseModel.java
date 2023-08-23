package com.expenseTracker.backend.models;

public class SuccessResponseModel {

    private String message;

    public SuccessResponseModel(String message) {
        this.message = message;
    }

    public void setMessage(String message){
        this.message = message;
    }

    public String getMessage(){
        return this.message;
    }

}
