package com.tickfund.TFService.modules.category;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.tickfund.TFService.commons.enums.CategoryType;

@Entity
@Table(name = "category")
public class Category {
    @Id
    private String Id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CategoryType type;

    @Column
    private String img;
}
