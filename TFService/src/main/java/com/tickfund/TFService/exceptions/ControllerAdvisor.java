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
import java.util.*;
import java.util.stream.Stream;

@ControllerAdvice
public class ControllerAdvisor {


    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Map onConstraintValidationException(
            ConstraintViolationException e) {
        Map<String, Object> response = new HashMap<>();
        List<String> messages = new ArrayList<>();
        for (ConstraintViolation violation : e.getConstraintViolations()) {
            messages.add("Property path = %s. Message = %s".formatted(violation.getPropertyPath(), violation.getMessage()));
        }
        response.put("error", "Invalid request body");
        response.put("message", messages);
        return response;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Map onMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {

        Map<String, Object> response = new HashMap<>();
        List<String> messages = new ArrayList<>();
        List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
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




//    @ExceptionHandler(InvalidRequestException.class)
//    public ResponseEntity<Object> handleInvalidRequest(
//            InvalidRequestException ex, WebRequest request) {
//
//        Map<String, Object> body = new LinkedHashMap<>();
//        body.put("error", "Invalid request body");
//        body.put("timestamp", LocalDateTime.now());
//        body.put("message", ex.getMessage());
//
//        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
//    }
//
//
//    @ExceptionHandler(ServerException.class)
//    public ResponseEntity<Object> handleServerError(
//            ServerException ex, WebRequest request) {
//
//        Map<String, Object> body = new LinkedHashMap<>();
//        body.put("timestamp", LocalDateTime.now());
//        body.put("message", "Something went wrong in server");
//
//        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//
//    @ExceptionHandler(ResourceNotFoundException.class)
//    public ResponseEntity<Object> handleResourceNotFound(
//            ResourceNotFoundException ex, WebRequest request) {
//
//        Map<String, Object> body = new LinkedHashMap<>();
//        body.put("error", "Resource not found");
//        body.put("timestamp", LocalDateTime.now());
//        body.put("message", ex.getMessage());
//
//        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
//    }
}
