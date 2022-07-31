package com.tickfund.TFService.exceptions;

public class InvalidRequestException extends Exception{
    public InvalidRequestException(String message){
        super(message);
    }
}
