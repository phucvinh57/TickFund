package com.example.TFService.exceptions;


public class TransactionMissingField extends Exception {
    String fieldName;
    @Override
    public String toString(){
        return "Missing Field: %s".formatted(this.fieldName);
    }

    public TransactionMissingField(String fieldName){
        this.fieldName = fieldName;
    }
    public String getFieldName(){
        return this.fieldName;
    }
}
