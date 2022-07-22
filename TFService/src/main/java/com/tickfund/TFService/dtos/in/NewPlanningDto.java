package com.tickfund.TFService.dtos.in;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.vos.RepetitionVo;
// import com.tickfund.TFService.interfaces.IBuilder;
import com.tickfund.TFService.dtos.CategoryDto;

public class NewPlanningDto {
    @JsonProperty
    @NotNull
    public CategoryDto category;

    @JsonProperty
    @NotNull
    public Integer amount;

    @JsonProperty
    public Integer userId;

    @JsonProperty
    @NotNull
    public Boolean isRepeat;

    @JsonProperty
    @NotNull
    public Date startDate;

    @JsonProperty
    public RepetitionVo repeat;
}