package com.tickfund.TFService.commons.enums;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;

public enum CycleEnum {
    DAY("day"),
    WEEK("week"), 
    MONTH("month"), 
    QUARTER("quarter"), 
    YEAR("year");

    @JsonProperty
    private final String name;

    CycleEnum(String name) {
        this.name = name;
    }

    @JsonValue
    public String getName() {
        return this.name;
    }

    public TemporalUnit toCalendarMagicField(){
        switch (this){
            case DAY:
                return ChronoUnit.DAYS;
            case WEEK:
                return ChronoUnit.WEEKS;
            case MONTH:
                return ChronoUnit.MONTHS;
            case YEAR:
                return ChronoUnit.YEARS;
            default:
                break;
        }
        return ChronoUnit.DAYS;
    }
}
