package com.tickfund.TFService.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CategoryType;

public class CategoryDto {
    @JsonProperty
    public String name;

    @JsonProperty
    public CategoryType type;

    CategoryDto(String name, CategoryType type) {
        this.name = name;
        this.type = type;
    }
}
