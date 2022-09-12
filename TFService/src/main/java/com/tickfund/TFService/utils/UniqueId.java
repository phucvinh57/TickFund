package com.tickfund.TFService.utils;

import java.sql.Timestamp;

public class UniqueId {
    public static String generate(String userId) {
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        // return String.join("-", Long.toString(ts.getTime()), userId);
        return Long.toString(ts.getTime()).concat(userId);
    }
}
