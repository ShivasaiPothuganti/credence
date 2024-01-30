package com.expenseTracker.backend.models;

public class JwtTokenResponse {

    private String token;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    private String username;
    private Long userId;


    public String getToken(){
        return this.token;
    }

    public void setToken(String token){
        this.token = token;
    }

}
