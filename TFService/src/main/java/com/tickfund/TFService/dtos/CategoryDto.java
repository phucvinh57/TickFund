package com.tickfund.TFService.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CategoryType;
import com.tickfund.TFService.entities.CategoryEntity;

import javax.validation.constraints.NotNull;

public class CategoryDto {
    @JsonProperty
    @NotNull
    public String name;

    @JsonProperty
    @NotNull
    public CategoryType type;

    @JsonProperty
    public String icon;

    public CategoryDto() {}

    public CategoryDto(CategoryEntity entity) {
        this.icon = entity.icon;
        this.name = entity.name;
        this.type = entity.type;
    }
}
