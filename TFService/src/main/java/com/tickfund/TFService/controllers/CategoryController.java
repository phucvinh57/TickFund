package com.tickfund.TFService.controllers;

import com.tickfund.TFService.dtos.CategoryDto;
import com.tickfund.TFService.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;

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
