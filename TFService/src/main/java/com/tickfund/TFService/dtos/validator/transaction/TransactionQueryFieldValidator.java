package com.tickfund.TFService.dtos.validator.transaction;

import com.tickfund.TFService.entities.tickfund.TransactionEntity;
import com.tickfund.TFService.utils.AnnotationHelper;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Service
public class TransactionQueryFieldValidator implements
        ConstraintValidator<TransactionQueryFieldConstraint, String> {

    @Override
    public void initialize(TransactionQueryFieldConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return AnnotationHelper.getFieldByAlias(TransactionEntity.class.getDeclaredFields(), value) != null;
    }
}
