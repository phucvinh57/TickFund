package com.tickfund.TFService.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.tickfund.TFService.commons.enums.CategoryType;

@Entity
@Table(schema = "tickfund", name = "category")
public class CategoryEntity {
    @Id
    public String Id;

    @Column(unique = true, nullable = false)
    public String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    public CategoryType type;

    @Column
    public String img;
}
