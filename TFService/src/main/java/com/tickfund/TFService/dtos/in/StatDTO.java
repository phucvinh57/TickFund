package com.tickfund.TFService.dtos.in;

import com.fasterxml.jackson.annotation.JsonProperty;
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

    public String getPeriod_type() {
        return period_type;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public void setPeriod_type(String period_type){ this.period_type = period_type;}

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Temporal(TemporalType.DATE)
    @JsonProperty
    LocalDate start;

    @JsonProperty
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate end;

    @JsonProperty
    String period_type;
}
