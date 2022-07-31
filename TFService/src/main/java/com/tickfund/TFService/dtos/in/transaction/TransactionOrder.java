package com.tickfund.TFService.dtos.in.transaction;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.dtos.validator.transaction.TransactionQueryFieldConstraint;

import javax.validation.constraints.Pattern;

public class TransactionOrder {
    public String getField() {
        return field;
    }

    public String getType() {
        return type;
    }

    public boolean isAsc(){
        return this.type.equals("ASC");
    }

    @JsonProperty
    @TransactionQueryFieldConstraint
    String field;

    @JsonProperty
    @Pattern(regexp = "ASC|DESC")
    String type;

    public TransactionOrder(){}
    public TransactionOrder(String field, String type){
        this.field = field;
        this.type = type;
    }
}
