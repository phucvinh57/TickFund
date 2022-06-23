package com.example.TFService.commons.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum RepetitionModeEnum {
    COUNTDOWN("countdown"), CYCLE("cycle");
    private final String name;

    RepetitionModeEnum(String name) {
        this.name = name;
    }

    @JsonValue
    public String getName() {
        return this.name;
    }
}