package com.tickfund.TFService.dtos.out.user;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TickfundUserWithRoleDto {
    @NotBlank
    @JsonProperty
    public String ID;

    @JsonProperty
    public Object role;
}
