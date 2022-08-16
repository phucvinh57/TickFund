package com.tickfund.TFService.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Cast Object to a specific type
 */
public class ObjectCaster {
    public static String toString(Object o) {
        return o == null ? null : o.toString();
    }

    public static Boolean toBoolean(Object o) {
        return o == null ? null : Boolean.valueOf(o.toString());
    }

    public static <E extends Enum<E>> E toEnum(Class<E> clazz, Object o) {
        return o == null ? null : Enum.valueOf(clazz, o.toString());
    }

    public static Date toDate(String pattern, Object o) throws ParseException {
        return o == null ? null : new SimpleDateFormat(pattern).parse(o.toString());
    }

    public static Integer toInteger(Object o) {
        return o == null ? null : Integer.valueOf(o.toString());
    }
}
