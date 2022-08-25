package com.tickfund.TFService.services;

import com.tickfund.TFService.dtos.CategoryDto;
import com.tickfund.TFService.entities.tickfund.CategoryEntity;
import com.tickfund.TFService.repositories.tickfund.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class CategoryService {
    @Autowired
    private CategoryRepository repository;

    public ArrayList<CategoryDto> getCategoryList() {
        ArrayList<CategoryEntity> entities = new ArrayList<>();
        this.repository.findAll().forEach(entities::add);

        ArrayList<CategoryDto> results = new ArrayList<>();
        for(CategoryEntity entity: entities) {
            results.add(new CategoryDto(entity));
        }
        return results;
    }

    public String createCategory(CategoryDto dto) {
        CategoryEntity entity = new CategoryEntity(dto);
        this.repository.createCategory(entity);
        return entity.name;
    }

    public void deleteCategoryByName(String name) {
        this.repository.deleteById(name);
    }

    public String updateCategoryByName(String oldName, CategoryDto dto) {
        CategoryEntity entity = new CategoryEntity(dto);
        Integer succeed = this.repository.updateByName(oldName, entity);
        return succeed == 1 ? entity.name : oldName;
    }

    public boolean isExist(String name){
        return this.repository.existsById(name);
    }
}
