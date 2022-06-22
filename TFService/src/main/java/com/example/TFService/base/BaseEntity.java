package com.example.TFService.base;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BaseEntity<TID>{

    @JsonProperty
    protected TID id;

    final public TID getId() {
        return id;
    }
}
