package com.tickfund.TFService.dtos.validator.transaction;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = TransactionQueryFieldValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface TransactionQueryFieldConstraint {
    String message() default "Transaction query field is not valid";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
