package com.tickfund.TFService.commons.enums;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

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
}
