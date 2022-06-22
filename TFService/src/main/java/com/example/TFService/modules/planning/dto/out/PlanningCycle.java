package com.example.TFService.modules.planning.dto.out;

import com.example.TFService.enums.CycleEnum;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public class PlanningCycle {
    @JsonProperty
    public CycleEnum cycle;

    @JsonProperty
    public LocalDateTime endDate;
    
    @JsonProperty
    public Boolean hasEndDay;

    public PlanningCycle(
        CycleEnum cycle,
        LocalDateTime endDate,
        Boolean hasEndDay
    ) {
        this.cycle = cycle;
        this.endDate = endDate;
        this.hasEndDay = hasEndDay;
    }
}
