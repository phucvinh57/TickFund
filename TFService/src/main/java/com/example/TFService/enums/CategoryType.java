package com.example.TFService.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum CategoryType {
    THU("thu"), CHI("chi");
    private final String name;
    
    CategoryType(String name){
        this.name = name;
    }

    @JsonValue
    public String getName(){
        return this.name;
    }
}
