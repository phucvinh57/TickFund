package com.tickfund.TFService.dtos.out;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CheckLoginOut {

    @JsonProperty
    Boolean code;

    @JsonProperty
    String message;

    @JsonProperty("user_id")
    String userId;

    @JsonProperty
    String role;

    public void setCode(Boolean code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
