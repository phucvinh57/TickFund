package com.tickfund.TFService.dtos.in.transaction;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.dtos.in.QuerySize;
import com.tickfund.TFService.dtos.in.transaction.TransactionOrder;
import com.tickfund.TFService.dtos.in.transaction.TransactionQueryFilter;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

public class TransactionQueryDTO {
    public List<TransactionQueryFilter> getShould() {
        return should;
    }

    @JsonProperty
    @Valid
    List<@Valid TransactionQueryFilter> should = new ArrayList<>();

    @JsonProperty
    @Valid
    List<@Valid TransactionQueryFilter> must = new ArrayList<>();

    public List<TransactionQueryFilter> getMust() {
        return must;
    }

    public QuerySize getSize() {
        return size;
    }

    public TransactionOrder getOrder() {
        return order;
    }

    @JsonProperty
    @Valid
    QuerySize size = new QuerySize(1, 20);

    @JsonProperty
    @Valid
    TransactionOrder order = new TransactionOrder("history", "DESC");
}
