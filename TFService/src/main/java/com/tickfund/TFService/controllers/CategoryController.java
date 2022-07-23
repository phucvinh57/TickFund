package com.tickfund.TFService.controllers;

import java.util.ArrayList;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tickfund.TFService.dtos.CategoryDto;
import com.tickfund.TFService.services.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    private CategoryService service;

    @GetMapping("")
    @ResponseBody
    public ArrayList<CategoryDto> getCategoryList() {
        return this.service.getCategoryList();
    }

    @PostMapping("")
    @ResponseBody
    public String createCategory(@Valid @RequestBody CategoryDto dto) {
        String categoryName = this.service.createCategory(dto);
        return categoryName;
    }

    @DeleteMapping("/{name}")
    @ResponseBody
    public String deleteCategory(
            @PathVariable(name = "name") String name) {
        this.service.deleteCategoryByName(name);
        return name;
    }

    @PutMapping("/{name}")
    @ResponseBody
    public String updateCategory(
            @PathVariable(name = "name") String categoryName,
            @Valid @RequestBody CategoryDto dto) {
        return this.service.updateCategoryByName(categoryName, dto);
    }
}
