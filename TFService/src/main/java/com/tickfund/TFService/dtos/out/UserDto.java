package com.tickfund.TFService.dtos.out;

import java.util.ArrayList;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.ExpertiseEnum;

public class UserDto {
    @JsonProperty
    @NotBlank
    public String ID;

    @JsonProperty
    public String name;

    @JsonProperty
    public String username;

    @JsonProperty
    public ExpertiseEnum expertise;

    @JsonProperty
    public Role role;

    public class Role {
        @JsonProperty
        public Integer ID;

        @JsonProperty
        public String name;
    }

    public UserDto(ArrayList<Object> queryData) {
        
    }
}
