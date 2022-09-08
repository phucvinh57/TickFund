package com.tickfund.TFService.dtos;

public class UserToken {
    public String getRoleId() {
        return this.roleId;
    }

    public String getUserId() {
        return userId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId.toString();
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    String roleId;
    String userId;
}
