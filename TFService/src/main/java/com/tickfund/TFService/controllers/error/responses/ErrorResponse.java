package com.tickfund.TFService.controllers.error.responses;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class ErrorResponse {
    private static String TIMESTAMP = "timestamp";
    private static String ERROR_MESSAGE = "message";
    String errorMessage;
    public ErrorResponse(String errorMessage){
        this.errorMessage = errorMessage;
    }

    public Map<String, Object> toMap(){
        Map<String, Object> errorMap = new HashMap<>();
        errorMap.put(TIMESTAMP, LocalDateTime.now());
        errorMap.put(ERROR_MESSAGE, errorMessage);
        return errorMap;
    }
}
