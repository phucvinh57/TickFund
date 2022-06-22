package com.example.TFService.modules.transaction.exception;

public class TransactionExcept{
    static public class MissingField extends Exception {
        String fieldName;
        @Override
        public String toString(){
            return "Missing Field: %s".formatted(this.fieldName);
        }

        public MissingField(String fieldName){
            this.fieldName = fieldName;
        }
        public String getFieldName(){
            return this.fieldName;
        }
    }
}