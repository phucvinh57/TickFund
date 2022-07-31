package com.tickfund.TFService.dtos.validator.transaction;

import com.tickfund.TFService.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Service
public class CategoryNameValidator implements
        ConstraintValidator<CategoryNameConstraint, String> {

    @Autowired
    CategoryService categoryService;

    @Override
    public void initialize(CategoryNameConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return categoryService.isExist(value);
    }
}
