package com.example.TFService.modules.common;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

public class CategoryVO {

    public enum CategoryType {
        INCOME("Thu"),
        OUTCOME("Chi");
    
        private final String name;
    
        CategoryType(String name){
            this.name = name;
        }

        @JsonValue
        public String getName(){
            return this.name;
        }
    }
    
    @JsonProperty
    String name;
    
    @JsonProperty
    CategoryType type = CategoryType.INCOME;

    public CategoryVO(String name, CategoryType type){
        this.name = name;
        this.type = type;
    }
}
