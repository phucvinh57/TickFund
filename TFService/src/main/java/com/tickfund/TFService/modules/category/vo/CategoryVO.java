package com.tickfund.TFService.modules.category.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CategoryType;

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
