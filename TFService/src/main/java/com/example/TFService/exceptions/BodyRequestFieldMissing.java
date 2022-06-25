package com.example.TFService.exceptions;

public class BodyRequestFieldMissing extends RuntimeException{
    public BodyRequestFieldMissing(String fieldName){
        super(String.format("Field [%s] is missing in your request body", fieldName));
    }
}
