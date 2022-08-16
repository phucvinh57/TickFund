package com.tickfund.TFService.dtos.out.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.ExpertiseEnum;

public class TicklabUserDto {
    @JsonProperty
    @NotBlank
    public String name;

    @JsonProperty
    @NotNull
    public Boolean active;

    @JsonProperty
    @NotBlank
    public String ID;

    @JsonProperty
    @NotBlank
    public ExpertiseEnum expertise;

    @JsonProperty
    public String username;

    @JsonProperty
    public Object department;
}
