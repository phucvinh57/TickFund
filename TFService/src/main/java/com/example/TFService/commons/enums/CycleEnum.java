package com.example.TFService.commons.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum CycleEnum {
    DAY("day"), 
    WEEK("week"), 
    MONTH("month"), 
    QUARTER("quarter"), 
    YEAR("year");

    private final String name;

    CycleEnum(String name) {
        this.name = name;
    }

    @JsonValue
    public String getName() {
        return this.name;
    }

}
