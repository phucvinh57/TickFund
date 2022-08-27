package com.tickfund.TFService.commons.vos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CycleEnum;
import com.tickfund.TFService.commons.enums.RepetitionModeEnum;

import java.time.LocalDate;

public class RepetitionVo {
    @JsonProperty
    public CycleEnum cycle;

    @JsonProperty
    public LocalDate endDate;

    @JsonProperty
    public Boolean hasEndDate;

    @JsonProperty
    public Integer countdown;
}
