package com.tickfund.TFService.dtos.in;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public class QuerySize {
    public Integer getPageNumber() {
        return pageNumber;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    @JsonProperty
    @JsonAlias({"page_number"})
    Integer pageNumber;

    @JsonProperty
    @JsonAlias({"page_size"})
    Integer pageSize;

    public QuerySize(){}
    public QuerySize(Integer pageNumber, Integer pageSize){
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}
