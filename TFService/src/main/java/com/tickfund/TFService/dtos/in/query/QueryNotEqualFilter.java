package com.tickfund.TFService.dtos.in.query;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.utils.AnnotationHelper;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


public class QueryNotEqualFilter extends AbstractQueryFilter {

    public Object getValue() {
        return value;
    }

    @JsonProperty
    Object value;

    @JsonProperty
    String format = "yyyy-MM-dd";

    @SuppressWarnings({"unchecked", "rawtypes"})
    @Override
    public Predicate toPredicate(CriteriaBuilder builder, Root transactionRoot, Class<?> clazz){
        String entityMapField = AnnotationHelper.getFieldByAlias(clazz.getDeclaredFields(), field);

        Class fieldType = transactionRoot.get(entityMapField).getJavaType();
        if(fieldType.equals(LocalDate.class) || fieldType.equals(LocalDateTime.class)){
            DateTimeFormatter dateFormat = this.getGeneralDateTimeFormat(format);
            try{
                LocalDateTime value = LocalDateTime.parse(String.valueOf(this.value), dateFormat);
                if(fieldType.equals(LocalDateTime.class)){
                    return builder.notEqual(transactionRoot.get(entityMapField), value);
                }
                else {
                    return builder.notEqual(transactionRoot.get(entityMapField), value.toLocalDate());
                }
            }
            catch (Exception e){
                // Empty
            }
        }
        else if(fieldType.isEnum()){
            return builder.notEqual(transactionRoot.get(entityMapField), Enum.valueOf(fieldType, ((String) value).toUpperCase()));
        }
        return builder.notEqual(transactionRoot.get(entityMapField), value);
    }
}
