package com.tickfund.TFService.commons.vos;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CycleEnum;

public class CycleVo {
    @JsonProperty
    public CycleEnum cycle;

    @JsonProperty
    public Date endDate;

    @JsonProperty
    public Boolean hasEndDate;

    public CycleVo(CycleEnum cycle, Boolean hasEndDate, Date endDate) {
        this.cycle = cycle;
        this.endDate = endDate;
        this.hasEndDate = hasEndDate;
    }
}
