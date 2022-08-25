package com.tickfund.TFService.commons.vos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CycleEnum;

import java.time.LocalDate;

public class CycleVo {
    @JsonProperty
    public CycleEnum cycle;

    @JsonProperty
    public LocalDate endDate;

    @JsonProperty
    public Boolean hasEndDate;

    public CycleVo(CycleEnum cycle, Boolean hasEndDate, LocalDate endDate) {
        this.cycle = cycle;
        this.endDate = endDate;
        this.hasEndDate = hasEndDate;
    }
}
