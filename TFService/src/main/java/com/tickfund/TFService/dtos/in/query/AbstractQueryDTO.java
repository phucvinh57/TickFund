package com.tickfund.TFService.dtos.in.query;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.dtos.in.QuerySize;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.ArrayList;
import java.util.List;

public abstract class AbstractQueryDTO {
    private final static String MUST = "must";
    // private final static String SHOULD = "should";

    @JsonProperty
    @NotNull
    @Pattern(regexp = "must|should")
    protected String op;

    @JsonProperty
    @Valid
    protected List<@Valid AbstractQueryFilter> filters = new ArrayList<>();
    @JsonProperty
    @Valid
    protected QuerySize size = new QuerySize(1, 20);

    @JsonProperty
    @Valid
    protected QueryOrder order = defaultOrder();

    public List<AbstractQueryFilter> getFilters() {
        return filters;
    }

    public QuerySize getSize() {
        return size;
    }

    public QueryOrder getOrder() {
        return order;
    }


    public boolean isMust(){
        return this.op.equals(MUST);
    }


    abstract public boolean isFilterFieldValid();

    abstract public boolean isOrderFieldValid();

    abstract public QueryOrder defaultOrder();
}
