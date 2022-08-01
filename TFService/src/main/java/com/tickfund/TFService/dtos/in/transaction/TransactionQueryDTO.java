package com.tickfund.TFService.dtos.in.transaction;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.dtos.in.QuerySize;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionQueryDTO {

    private final static String MUST = "must";
    private final static String SHOULD = "should";

    @JsonProperty
    @NotNull
    @Pattern(regexp = "must|should")
    String op;

    @JsonProperty
    @Valid
    List<@Valid TransactionQueryFilter> filters = new ArrayList<>();

    public List<TransactionQueryFilter> getFilters() {
        return filters;
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

    public boolean isMust(){
        return this.op.equals(MUST);
    }
}
