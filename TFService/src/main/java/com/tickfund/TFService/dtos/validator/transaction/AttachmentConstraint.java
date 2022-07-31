package com.tickfund.TFService.dtos.validator.transaction;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = AttachmentValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface AttachmentConstraint {
    String message() default "Some of attachment id is not exist";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
