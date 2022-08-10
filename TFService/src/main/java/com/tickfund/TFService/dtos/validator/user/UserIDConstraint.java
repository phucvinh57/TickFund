package com.tickfund.TFService.dtos.validator.user;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UserIDValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UserIDConstraint {
    String message() default "Invalid user id";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
