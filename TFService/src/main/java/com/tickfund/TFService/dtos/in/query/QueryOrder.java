package com.tickfund.TFService.dtos.in.query;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Pattern;

public class QueryOrder {
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
    String field;

    @JsonProperty
    @Pattern(regexp = "ASC|DESC")
    String type;

    public QueryOrder(){}
    public QueryOrder(String field, String type){
        this.field = field;
        this.type = type;
    }
}
