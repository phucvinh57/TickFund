package com.tickfund.TFService.dtos.in.transaction;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.dtos.validator.transaction.TransactionQueryFieldConstraint;
import com.tickfund.TFService.entities.tickfund.TransactionEntity;
import com.tickfund.TFService.utils.AnnotationHelper;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.validation.constraints.AssertTrue;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;


public class TransactionRangeFilter extends TransactionQueryFilter {

    @JsonProperty
    @TransactionQueryFieldConstraint
    String field;

    public String getField() {
        return field;
    }

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

    public Predicate toPredicate(CriteriaBuilder builder, Root transactionRoot){
        String entityMapField = AnnotationHelper.getFieldByAlias(TransactionEntity.class.getDeclaredFields(), field);

        Class<?> fieldType = transactionRoot.get(entityMapField).getJavaType();
        if(fieldType.equals(Date.class)){
            DateFormat dateFormat = new SimpleDateFormat(format, Locale.ENGLISH);
            dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
            try{
                if(lowerBound != null && upperBound != null){
                    Date fromDate = dateFormat.parse(String.valueOf(lowerBound));
                    Date toDate = dateFormat.parse(String.valueOf(upperBound));
                    return builder.between(transactionRoot.get(entityMapField), fromDate, toDate);
                }
                else if(lowerBound != null){
                    Date lowerDate = dateFormat.parse(String.valueOf(lowerBound));
                    return builder.greaterThanOrEqualTo(transactionRoot.get(entityMapField), lowerDate);
                }
                else {
                    Date upperDate = dateFormat.parse(String.valueOf(upperBound));
                    return builder.lessThanOrEqualTo(transactionRoot.get(entityMapField), upperDate);
                }
            }
            catch (Exception e){
                // Empty
            }
        }

        return captureHelper(builder, transactionRoot, fieldType, entityMapField);
    }
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
