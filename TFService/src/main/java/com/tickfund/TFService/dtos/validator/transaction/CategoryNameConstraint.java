package com.tickfund.TFService.dtos.validator.transaction;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = CategoryNameValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface CategoryNameConstraint {
    String message() default "Invalid category name";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
