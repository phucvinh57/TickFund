package com.example.TFService.modules.category.vo;

import com.example.TFService.commons.enums.CategoryType;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CategoryVO {
    @JsonProperty
    String name;

    @JsonProperty
    CategoryType type;

    public CategoryVO(String name, CategoryType type) {
        this.name = name;
        this.type = type;
    }
}
