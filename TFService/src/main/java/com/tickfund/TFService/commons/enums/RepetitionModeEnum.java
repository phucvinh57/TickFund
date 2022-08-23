package com.tickfund.TFService.commons.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum RepetitionModeEnum {
    @JsonProperty("countdown")
    COUNTDOWN("countdown"), 

    @JsonProperty("cycle")
    CYCLE("cycle");

    private final String name;

    RepetitionModeEnum(String name) {
        this.name = name;
    }

//    @JsonValue
//    public String getName() {
//        return this.name;
//    }
}