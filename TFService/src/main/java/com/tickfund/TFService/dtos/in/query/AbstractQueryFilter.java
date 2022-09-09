package com.tickfund.TFService.dtos.in.query;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoField;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = QueryRangeFilter.class, name = "range"),
        @JsonSubTypes.Type(value = QueryEqualFilter.class, name = "equal"),
        @JsonSubTypes.Type(value = QueryNotEqualFilter.class, name = "not_equal"),
})
@Service
public abstract class AbstractQueryFilter {
    abstract public Predicate toPredicate(CriteriaBuilder builder, Root<?> transactionRoot, Class<?> clazz);

    @JsonProperty
    protected String field;

    final public String getField() {
        return this.field;
    }

    final protected DateTimeFormatter getGeneralDateTimeFormat(String format) {
        return new DateTimeFormatterBuilder().appendPattern(format)
                .parseDefaulting(ChronoField.HOUR_OF_DAY, 0)
                .parseDefaulting(ChronoField.MINUTE_OF_HOUR, 0)
                .parseDefaulting(ChronoField.SECOND_OF_MINUTE, 0)
                .toFormatter();
    }
}
