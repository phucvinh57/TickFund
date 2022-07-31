package com.tickfund.TFService.dtos.in.transaction;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = TransactionRangeFilter.class, name = "range"),
})
public abstract class TransactionQueryFilter {
    abstract public Predicate toPredicate(CriteriaBuilder builder, Root transactionRoot);
}
