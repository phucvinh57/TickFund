package com.tickfund.TFService.dtos;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.vos.RepetitionVo;
// import com.tickfund.TFService.interfaces.IBuilder;

public class NewPlanningDto {
    @JsonProperty
    public CategoryDto category;

    @JsonProperty
    public Integer amount;

    @JsonProperty
    public Integer userId;

    @JsonProperty
    public Boolean isRepeat;

    @JsonProperty
    public Date startDate;

    @JsonProperty
    public RepetitionVo repeat;
}
