package com.tickfund.TFService.dtos.in.transaction;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = TransactionRangeFilter.class, name = "range"),
        @JsonSubTypes.Type(value = TransactionEqualFilter.class, name = "equal"),
        @JsonSubTypes.Type(value = TransactionNotEqualFilter.class, name = "not_equal"),
})
@Service
public abstract class TransactionQueryFilter {
    abstract public Predicate toPredicate(CriteriaBuilder builder, Root transactionRoot);
}
