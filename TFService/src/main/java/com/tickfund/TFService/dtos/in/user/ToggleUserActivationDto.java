package com.tickfund.TFService.dtos.in.user;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ToggleUserActivationDto {
    @JsonProperty
    public Boolean active;
}
