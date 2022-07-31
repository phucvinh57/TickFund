package com.tickfund.TFService.dtos.validator.transaction;

import com.tickfund.TFService.services.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Set;

@Service
public class AttachmentValidator implements
        ConstraintValidator<AttachmentConstraint, Set<String>> {

    @Autowired
    AttachmentService attachmentService;

    @Override
    public void initialize(AttachmentConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Set<String> values, ConstraintValidatorContext context) {
        if(values == null){
            return true;
        }
        for(String attachment : values){
            if(! attachmentService.isTempExist(attachment)){
                return false;
            }
        }
        return true;
    }
}
