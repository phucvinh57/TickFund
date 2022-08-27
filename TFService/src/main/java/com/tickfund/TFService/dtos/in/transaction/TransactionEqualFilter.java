package com.tickfund.TFService.dtos.in.transaction;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.dtos.validator.transaction.TransactionQueryFieldConstraint;
import com.tickfund.TFService.entities.tickfund.TransactionEntity;
import com.tickfund.TFService.utils.AnnotationHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


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
    public Predicate toPredicate(CriteriaBuilder builder, Root root){
        String entityMapField = AnnotationHelper.getFieldByAlias(TransactionEntity.class.getDeclaredFields(), field);

        Class fieldType = root.get(entityMapField).getJavaType();
        if(fieldType.equals(LocalDate.class) || fieldType.equals(LocalDateTime.class)){
            DateTimeFormatter dateFormat = this.getGeneralDateTimeFormat(format);
            try{
                LocalDateTime value = LocalDateTime.parse(String.valueOf(this.value), dateFormat);
                if(fieldType.equals(LocalDateTime.class)){
                    return builder.equal(root.get(entityMapField), value);
                }
                else {
                    return builder.equal(root.get(entityMapField), value.toLocalDate());
                }
            }
            catch (Exception e){
                // Empty
            }
        }
        else if(fieldType.isEnum()){
            return builder.equal(root.get(field), Enum.valueOf(fieldType, (String )value));
        }
        return builder.equal(root.get(field), value);
    }
}
