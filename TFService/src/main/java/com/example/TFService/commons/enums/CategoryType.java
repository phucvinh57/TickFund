package com.example.TFService.commons.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum CategoryType {
    INCOME("thu"), EXPENSE("chi");
    private final String name;
    
    CategoryType(String name){
        this.name = name;
    }

    @JsonValue
    public String getName(){
        return this.name;
    }
}
