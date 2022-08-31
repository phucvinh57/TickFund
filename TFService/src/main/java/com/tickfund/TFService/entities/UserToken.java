package com.tickfund.TFService.entities;

public class UserToken {
    public String getRole() {
        return role;
    }
    public String getUserId(){return userId;}

    public void setRole(String role) {
        this.role = role;
    }
    public void setUserId(String userId){this.userId = userId;}

    String role;
    String userId;
}
