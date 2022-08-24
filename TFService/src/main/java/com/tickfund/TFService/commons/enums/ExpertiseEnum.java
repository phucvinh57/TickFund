package com.tickfund.TFService.commons.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ExpertiseEnum {
    IT("IT"), ME("ME"), DEE("DEE");
    private final String name;

    ExpertiseEnum(String name) {
        this.name = name;
    }

    @JsonValue
    public String getName() {
        return this.name;
    }
}
