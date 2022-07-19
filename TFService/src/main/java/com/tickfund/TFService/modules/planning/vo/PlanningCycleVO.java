package com.tickfund.TFService.modules.planning.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CycleEnum;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class PlanningCycleVO {
    @JsonProperty
    public CycleEnum cycle;

    @JsonProperty
    public LocalDateTime endDate;
    
    @JsonProperty
    public Boolean hasEndDay;

    public PlanningCycleVO(
        CycleEnum cycle,
        String endDate,
        Boolean hasEndDay
    ) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        this.cycle = cycle;
        this.endDate = LocalDateTime.parse(endDate, formatter);
        this.hasEndDay = hasEndDay;
    }
}