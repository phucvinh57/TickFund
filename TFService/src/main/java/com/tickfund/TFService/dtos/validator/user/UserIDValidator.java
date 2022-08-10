package com.tickfund.TFService.dtos.validator.user;

import com.tickfund.TFService.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Service
public class UserIDValidator implements
        ConstraintValidator<UserIDConstraint, String> {

    @Autowired
    UserService userService;

    @Override
    public void initialize(UserIDConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return userService.isExist(value);
    }
}
