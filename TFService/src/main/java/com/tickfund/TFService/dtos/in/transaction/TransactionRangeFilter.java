package com.tickfund.TFService.dtos.in.transaction;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.dtos.validator.transaction.TransactionQueryFieldConstraint;
import com.tickfund.TFService.entities.TransactionEntity;
import com.tickfund.TFService.utils.AnnotationHelper;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.validation.constraints.AssertTrue;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;


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
    Object lowerBound;

    @JsonProperty
    Object upperBound;

    public Predicate toPredicate(CriteriaBuilder builder, Root transactionRoot){
        String entityMapField = AnnotationHelper.getFieldByAlias(TransactionEntity.class.getDeclaredFields(), field);

        Class fieldType = transactionRoot.get(entityMapField).getJavaType();
        if(fieldType.equals(Date.class)){
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
            try{
                if(lowerBound != null && upperBound != null){
                    Date fromDate = format.parse(String.valueOf(lowerBound));
                    Date toDate = format.parse(String.valueOf(upperBound));
                    return builder.between(transactionRoot.get(entityMapField), fromDate, toDate);
                }
                else if(lowerBound != null){
                    Date lowerDate = format.parse(String.valueOf(lowerBound));
                    return builder.greaterThanOrEqualTo(transactionRoot.get(entityMapField), lowerDate);
                }
                else {
                    Date upperDate = format.parse(String.valueOf(upperBound));
                    return builder.lessThanOrEqualTo(transactionRoot.get(entityMapField), upperDate);
                }
            }
            catch (Exception e){
                // Empty
            }
        }

        if(lowerBound != null && upperBound != null){
            return builder.between(transactionRoot.get(field), (Integer)lowerBound, (Integer) upperBound);
        }
        else if(lowerBound != null){
            return builder.greaterThanOrEqualTo(transactionRoot.get(entityMapField), (Integer) lowerBound);
        }
        else {
            return builder.lessThanOrEqualTo(transactionRoot.get(entityMapField), (Integer) upperBound);
        }

    }

    @AssertTrue(message = "At least upper bound or lower bound is not null")
    public boolean isAtLeastOneBoundNotNull(){
        return lowerBound != null || upperBound != null;
    }
}
