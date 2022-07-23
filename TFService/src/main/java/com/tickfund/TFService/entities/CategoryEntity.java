package com.tickfund.TFService.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.tickfund.TFService.commons.enums.CategoryType;
import com.tickfund.TFService.dtos.CategoryDto;

@Entity
@Table(schema = "tickfund", name = "category")
public class CategoryEntity {
    @Id
    public String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    public CategoryType type;

    @Column(nullable = true)
    public String icon;

    public CategoryEntity() {}
    public CategoryEntity(CategoryDto dto) {
        this.name = dto.name;
        this.type = dto.type;
        this.icon = dto.icon;
    }
}