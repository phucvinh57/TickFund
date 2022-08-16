package com.tickfund.TFService.utils;

import java.sql.Timestamp;

public class UniqueId {
    public static String generate(String username) {
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        return String.join("-", Long.toString(ts.getTime()), username);
    }
}
