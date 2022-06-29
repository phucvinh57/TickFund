package com.tickfund.TFService.commons.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum DepartmentEnum {
    ENGINEER("engineer"), RESEARCH("research"), HR("human_resource");
    private final String name;

    DepartmentEnum(String name) {
        this.name = name;
    }

    @JsonValue
    public String getName() {
        return this.name;
    }
}
