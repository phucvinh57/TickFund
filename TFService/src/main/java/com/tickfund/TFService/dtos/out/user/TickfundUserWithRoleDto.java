package com.tickfund.TFService.dtos.out.user;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.entities.tickfund.RoleEntity;

// @JsonIgnoreProperties(ignoreUnknown = true)
public class TickfundUserWithRoleDto {
    @NotBlank
    @JsonProperty
    public String ID;

    @JsonProperty
    public RoleEntity role;
}
