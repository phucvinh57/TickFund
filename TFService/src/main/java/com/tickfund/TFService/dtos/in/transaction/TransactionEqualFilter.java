package com.tickfund.TFService.dtos.in.transaction;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.dtos.validator.transaction.TransactionQueryFieldConstraint;
import com.tickfund.TFService.entities.TransactionEntity;
import com.tickfund.TFService.utils.AnnotationHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;


@Service
@Component
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

    @JsonProperty
    String format = "yyyy-MM-dd";

    @SuppressWarnings({"unchecked", "rawtypes"})
    public Predicate toPredicate(CriteriaBuilder builder, Root transactionRoot){
        String entityMapField = AnnotationHelper.getFieldByAlias(TransactionEntity.class.getDeclaredFields(), field);

        Class fieldType = transactionRoot.get(entityMapField).getJavaType();
        if(fieldType.equals(Date.class)){
            DateFormat dateFormat = new SimpleDateFormat(format, Locale.ENGLISH);
            dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
            try{
                Date value = dateFormat.parse(String.valueOf(this.value));
                return builder.equal(transactionRoot.get(entityMapField), value);
            }
            catch (Exception e){
                // Empty
            }
        }
        else if(fieldType.isEnum()){
            return builder.equal(transactionRoot.get(field), Enum.valueOf(fieldType, (String )value));
        }
        return builder.equal(transactionRoot.get(field), value);
    }
}