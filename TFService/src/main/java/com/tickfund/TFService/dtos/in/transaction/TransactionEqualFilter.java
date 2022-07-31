package com.tickfund.TFService.dtos.in.transaction;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.dtos.validator.transaction.TransactionQueryFieldConstraint;
import com.tickfund.TFService.entities.TransactionEntity;
import com.tickfund.TFService.utils.AnnotationHelper;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;


public class TransactionEqualFilter extends TransactionQueryFilter {

    @JsonProperty
    @TransactionQueryFieldConstraint
    String field;

    public String getField() {
        return field;
    }

    public Object getValue() {
        return value;
    }


    @JsonProperty
    Object value;

    public Predicate toPredicate(CriteriaBuilder builder, Root transactionRoot){
        String entityMapField = AnnotationHelper.getFieldByAlias(TransactionEntity.class.getDeclaredFields(), field);

        Class fieldType = transactionRoot.get(entityMapField).getJavaType();
        if(fieldType.equals(Date.class)){
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
            try{
                Date value = format.parse(String.valueOf(this.value));
                return builder.equal(transactionRoot.get(entityMapField), value);
            }
            catch (Exception e){
                // Empty
            }
        }
        return builder.equal(transactionRoot.get(field), value);
    }
}
