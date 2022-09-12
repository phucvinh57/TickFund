package com.tickfund.TFService.dtos.out;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class QueryResultOut<T> {
    public void setResults(List<T> results) {
        this.results = results;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    @JsonProperty
    List<T> results = new ArrayList<>();

    @JsonProperty
    Long total = 0L;
}
