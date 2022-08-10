package com.tickfund.TFService.dtos.in;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CycleEnum;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Date;

public class StatDTO {

    public Date getStart() {
        return start;
    }

    public Date getEnd() {
        return end;
    }

    public CycleEnum getPeriodType() {
        return periodType;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public void setPeriodType(CycleEnum periodType) {
        this.periodType = periodType;
    }

    @JsonProperty
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    Date start;

    @JsonProperty
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    Date end;

    @JsonProperty
    @JsonAlias({"period_type"})
    CycleEnum periodType;
}
