package com.example.TFService.modules.common;

import com.example.TFService.enums.CategoryType;

public class Category {
    String name;
    CategoryType type;

    public Category(String name, CategoryType type) {
        this.name = name;
        this.type = type;
    }
}
