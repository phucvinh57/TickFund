package com.tickfund.TFService.utils;

import java.text.Normalizer;

public class RemoveAccents {
    public static String normalize(String s) {
        s = Normalizer.normalize(s, Normalizer.Form.NFD);
        return s.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "")
                .replaceAll("đ", "d")
                .replaceAll("Đ", "D");
    }
}
