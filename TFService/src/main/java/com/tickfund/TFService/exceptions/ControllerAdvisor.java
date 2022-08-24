package com.tickfund.TFService.exceptions;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.tickfund.TFService.utils.AnnotationHelper;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class ControllerAdvisor {


    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Map<String, Object> onConstraintValidationException(
            ConstraintViolationException e) {
        Map<String, Object> response = new HashMap<>();
        List<String> messages = new ArrayList<>();
        for (ConstraintViolation<?> violation : e.getConstraintViolations()) {
            messages.add("Property path = %s. Message = %s".formatted(violation.getPropertyPath(), violation.getMessage()));
        }
        response.put("error", "Invalid request body");
        response.put("message", messages);
        return response;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Map<String, Object> onMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {

        Map<String, Object> response = new HashMap<>();
        List<String> messages = new ArrayList<>();
        // List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
        Field[] clsFields = e.getParameter().getParameter().getType().getDeclaredFields();
        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            String fieldErrorAlias = getFieldErrorAlias(clsFields, fieldError);
            messages.add("Property path = %s. Message = %s".formatted(fieldErrorAlias, fieldError.getDefaultMessage()));
        }
        response.put("error", "Invalid request body");
        response.put("message", messages);
        return response;
    }

    String getFieldErrorAlias(Field[] clsFields, FieldError e) {

        JsonAlias[] alisas = AnnotationHelper.getJsonAliasForField(clsFields, e.getField());

        if (alisas == null || alisas.length == 0) {
            return e.getField();
        }

        String[] values = alisas[0].value();
        if (values.length == 0) {
            return e.getField();
        }

        return values[0];
    }
}
