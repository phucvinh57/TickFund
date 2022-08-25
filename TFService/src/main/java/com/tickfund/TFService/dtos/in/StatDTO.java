package com.tickfund.TFService.dtos.in;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CycleEnum;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.time.LocalDate;

public class StatDTO {

    public LocalDate getStart() {
        return start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public CycleEnum getPeriodType() {
        return periodType;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public void setPeriodType(CycleEnum periodType) {
        this.periodType = periodType;
    }

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Temporal(TemporalType.DATE)
    LocalDate start;

    @JsonProperty
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate end;

    @JsonProperty
    @JsonAlias({"period_type"})
    CycleEnum periodType;
}
