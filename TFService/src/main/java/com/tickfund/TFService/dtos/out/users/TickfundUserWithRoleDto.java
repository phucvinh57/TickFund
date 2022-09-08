package com.tickfund.TFService.dtos.out.users;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.entities.tickfund.RoleEntity;

public class TickfundUserWithRoleDto {
    @NotBlank
    @JsonProperty
    public String ID;

    @JsonProperty
    public RoleEntity role;
}
