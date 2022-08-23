package com.tickfund.TFService.dtos.out;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.entities.StatBucket;

import java.util.List;
import java.util.stream.Stream;

public class StatOut {
    @JsonProperty
    List<StatBucket> transactions;
    @JsonProperty
    List<StatBucket> plannings;

    @JsonProperty
    List<StatBucket> merge;

    @JsonProperty("previous_amount")
    Integer previousAmount;

    public StatOut(List<StatBucket> transactions, List<StatBucket> plannings, Integer previousAmount) {
        this.transactions = transactions;
        this.plannings = plannings;
        this.previousAmount = previousAmount;
        this.merge = Stream
                .concat(transactions.stream(), plannings.stream())
                .collect(StatBucket.collectorToList());
    }
}
