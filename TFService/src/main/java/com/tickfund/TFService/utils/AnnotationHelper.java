package com.tickfund.TFService.utils;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Stream;

public class AnnotationHelper {
    public static JsonAlias[] getJsonAliasForField(Field[] clsFields, String fieldName) {
        Optional<Field> first = Stream.of(clsFields).filter(f -> f.getName().equals(fieldName)).findFirst();
        return first.map(field -> field.getAnnotationsByType(JsonAlias.class)).orElse(null);
    }

    public static String getFieldByAlias(Field[] clsFields, String alias){
        for(Field field : clsFields){
            JsonAlias[] aliases = field.getAnnotationsByType(JsonAlias.class);
            if(aliases.length == 0){
                continue;
            }
            if(Arrays.asList(aliases[0].value()).contains(alias)){
                return field.getName();
            }
        }

        Optional<Field> first = Stream.of(clsFields).filter(f -> f.getName().equals(alias)).findFirst();
        return first.map(field -> field.getName()).orElse(null);
    }
}
