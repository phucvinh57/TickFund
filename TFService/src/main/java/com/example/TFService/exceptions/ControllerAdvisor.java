package com.example.TFService.exceptions;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.stream.Collectors;

@ControllerAdvice
public class ControllerAdvisor {
    final String TIMESTAMP_KEY = "timestamp";
    final String MESSAGE_KEY = "message";
    @ExceptionHandler(BodyRequestFieldMissing.class)
    public ResponseEntity<Object> handleMissingField(BodyRequestFieldMissing ex, WebRequest request){
        HashMap<String, Object> body = new HashMap<>();
        body.put(TIMESTAMP_KEY, LocalDateTime.now());
        body.put(MESSAGE_KEY, ex.getMessage());
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidFormatException.class)
    public ResponseEntity<Object> handleMessageNotReadable(InvalidFormatException ex, WebRequest request){
        final String PATH = String.join(".", ex.getPath()
                .stream()
                .map(path -> path.getFieldName())
                .collect(Collectors.toList()));
        final Object VALUE = ex.getValue();
        HashMap<String, Object> body = new HashMap<>();
        body.put(TIMESTAMP_KEY, LocalDateTime.now());
        body.put(MESSAGE_KEY, "Invalid body format");
        body.put("error_field", PATH);
        body.put("error_value", VALUE);
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }
}
