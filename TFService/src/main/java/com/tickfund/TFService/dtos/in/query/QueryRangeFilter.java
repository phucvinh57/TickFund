package com.tickfund.TFService.dtos.in.query;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.utils.AnnotationHelper;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.validation.constraints.AssertTrue;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


public class QueryRangeFilter extends AbstractQueryFilter {

    public Object getLowerBound() {
        return lowerBound;
    }

    public Object getUpperBound() {
        return upperBound;
    }

    @JsonProperty
    @JsonAlias({"lower_bound"})
    Object lowerBound;

    @JsonProperty
    @JsonAlias({"upper_bound"})
    Object upperBound;

    @JsonProperty
    String format = "yyyy-MM-dd";

    @SuppressWarnings({"unchecked", "rawtypes"})
    public Predicate toPredicate(CriteriaBuilder builder, Root transactionRoot, Class<?> clazz){
        String entityMapField = AnnotationHelper.getFieldByAlias(clazz.getDeclaredFields(), field);

        Class<?> fieldType = transactionRoot.get(entityMapField).getJavaType();
        if(fieldType.equals(LocalDate.class) || fieldType.equals(LocalDateTime.class)){

            DateTimeFormatter dateFormat = super.getGeneralDateTimeFormat(format);
            try{
                if(lowerBound != null && upperBound != null){
                    LocalDateTime fromDateTime = LocalDateTime.parse(String.valueOf(lowerBound), dateFormat);
                    LocalDateTime toDateTime = LocalDateTime.parse(String.valueOf(upperBound), dateFormat);
                    if(fieldType.equals(LocalDateTime.class)){
                        return builder.between(transactionRoot.get(entityMapField), fromDateTime, toDateTime);
                    }
                    else {
                        return builder.between(transactionRoot.get(entityMapField), fromDateTime.toLocalDate(), toDateTime.toLocalDate());
                    }
                }
                else if(lowerBound != null){
                    LocalDateTime lowerDateTime = LocalDateTime.parse(String.valueOf(lowerBound), dateFormat);
                    if(fieldType.equals(LocalDateTime.class)){
                        return builder.greaterThanOrEqualTo(transactionRoot.get(entityMapField), lowerDateTime);
                    }
                    else {
                        return builder.greaterThanOrEqualTo(transactionRoot.get(entityMapField), lowerDateTime.toLocalDate());
                    }
                }
                else {
                    LocalDateTime upperDateTime = LocalDateTime.parse(String.valueOf(upperBound), dateFormat);
                    if(fieldType.equals(LocalDateTime.class)){
                        return builder.greaterThanOrEqualTo(transactionRoot.get(entityMapField), upperDateTime);
                    }
                    else {
                        return builder.greaterThanOrEqualTo(transactionRoot.get(entityMapField), upperDateTime.toLocalDate());
                    }
                }
            }
            catch (Exception e){
                // Empty
            }
        }

        return captureHelper(builder, transactionRoot, fieldType, entityMapField);
    }
    @SuppressWarnings({"unchecked", "rawtypes"})
    <T> Predicate captureHelper(CriteriaBuilder builder, Root transactionRoot, Class<T> clazz, String field){
        if(lowerBound != null && upperBound != null){
            return builder.between(transactionRoot.get(field), (Comparable) clazz.cast(lowerBound), (Comparable) clazz.cast(upperBound));
        }
        else if(lowerBound != null){
            return builder.greaterThanOrEqualTo(transactionRoot.get(field), (Comparable) clazz.cast(lowerBound));
        }
        else {
            return builder.lessThanOrEqualTo(transactionRoot.get(field), (Comparable) clazz.cast(upperBound));
        }
    }

    @AssertTrue(message = "At least upper bound or lower bound is not null")
    public boolean isAtLeastOneBoundNotNull(){
        return lowerBound != null || upperBound != null;
    }
}
