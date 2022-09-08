package com.tickfund.TFService.dtos.in.user;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateRoleNameDto {
    @JsonProperty
    @NotNull
    @Min(value = 1)
    public Integer roleId;

    @JsonProperty
    @NotNull
    @NotBlank
    public String roleName;
}
