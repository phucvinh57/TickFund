package com.tickfund.TFService.commons.vos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CategoryType;

import javax.validation.constraints.NotNull;

public class CategoryVo {
    @JsonProperty
    @NotNull
    public String name;

    @JsonProperty
    @NotNull
    public CategoryType type;

    public CategoryVo(String name, CategoryType type) {
        this.name = name;
        this.type = type;
    }
}
