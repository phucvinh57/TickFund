package com.tickfund.TFService.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CategoryType;
import com.tickfund.TFService.entities.tickfund.CategoryEntity;

public class CategoryDto {
    @JsonProperty
    @NotBlank
    public String name;

    @JsonProperty
    @NotNull
    public CategoryType type;

    @JsonProperty
    @NotBlank
    public String icon;

    public CategoryDto() {}

    public CategoryDto(CategoryEntity entity) {
        this.icon = entity.icon;
        this.name = entity.name;
        this.type = entity.type;
    }
}
