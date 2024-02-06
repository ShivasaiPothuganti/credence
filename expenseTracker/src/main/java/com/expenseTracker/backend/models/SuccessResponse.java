package com.expenseTracker.backend.models;

public class SuccessResponse {

    public SuccessResponse(boolean status){
        this.status = status;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public boolean status;


}
