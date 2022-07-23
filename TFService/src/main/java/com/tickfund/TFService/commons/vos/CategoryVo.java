package com.tickfund.TFService.commons.vos;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CategoryType;

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
