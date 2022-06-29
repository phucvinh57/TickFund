package com.tickfund.TFService.commons.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum MajorEnum {
    IT("IT"), ME("Co khi"), DEE("Dien");
    private final String name;

    MajorEnum(String name) {
        this.name = name;
    }

    @JsonValue
    public String getName() {
        return this.name;
    }
}
