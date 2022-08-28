package com.tickfund.TFService.commons.enums;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

public enum CategoryType {
    INCOME("income"),

    EXPENSE("expense");
    @JsonProperty
    private final String name;
    
    CategoryType(String name){
        this.name = name.toLowerCase();
    }

    @JsonValue
    public String getName(){
       return this.name;
   }
}
