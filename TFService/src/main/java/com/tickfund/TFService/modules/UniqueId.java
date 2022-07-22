package com.tickfund.TFService.modules;

import java.sql.Timestamp;

public class UniqueId {
    public static String generate(String username) {
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        return Long.toString(ts.getTime()).concat(username);
    }
}
