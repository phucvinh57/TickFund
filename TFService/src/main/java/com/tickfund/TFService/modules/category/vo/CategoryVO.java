package com.tickfund.TFService.modules.category.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CategoryType;

public class CategoryVO {
    @JsonProperty
    private String name;

    @JsonProperty
    private CategoryType type;

    @JsonProperty
    private String img; 

    public CategoryVO(String name, CategoryType type, String img) {
        this.name = name;
        this.type = type;
        this.img = img;
    }
}
