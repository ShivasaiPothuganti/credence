package com.expenseTracker.backend.models;

public class JwtTokenResponse {

    private String token;

    public String getToken(){
        return this.token;
    }

    public void setToken(String token){
        this.token = token;
    }

}
