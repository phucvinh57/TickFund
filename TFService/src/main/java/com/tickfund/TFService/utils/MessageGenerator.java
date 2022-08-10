package com.tickfund.TFService.utils;

public class MessageGenerator {
    public static String genInvalidValue(String field, String reason) {
        final String template = "Invalid value in field %s. Reason: %s";
        return template.formatted(field, reason);
    }

    public static String genMissingField(String field){
        final String template = "Missing field %s";
        return template.formatted(field);
    }
}
