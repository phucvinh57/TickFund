package com.tickfund.TFService.dtos.in.user;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateUserDto extends CreateUserDto {
    @JsonProperty
    @NotNull
    public Boolean active;
}
