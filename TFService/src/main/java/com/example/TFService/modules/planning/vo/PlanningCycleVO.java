package com.example.TFService.modules.planning.vo;

import com.example.TFService.commons.enums.CycleEnum;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public class PlanningCycleVO {
    @JsonProperty
    public CycleEnum cycle;

    @JsonProperty
    public LocalDateTime endDate;
    
    @JsonProperty
    public Boolean hasEndDay;

    public PlanningCycleVO(
        CycleEnum cycle,
        LocalDateTime endDate,
        Boolean hasEndDay
    ) {
        this.cycle = cycle;
        this.endDate = endDate;
        this.hasEndDay = hasEndDay;
    }
}
