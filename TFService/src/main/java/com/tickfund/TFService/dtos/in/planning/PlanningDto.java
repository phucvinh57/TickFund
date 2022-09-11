package com.tickfund.TFService.dtos.in.planning;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.vos.RepetitionVo;
import com.tickfund.TFService.dtos.validator.transaction.CategoryNameConstraint;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class PlanningDto {
    @NotNull
    @JsonAlias({"category_name"})
    @CategoryNameConstraint
    @JsonProperty
    public String categoryName;

    @JsonProperty
    @NotNull
    @Min(value = 0)
    public Integer amount;

    @JsonProperty
    @JsonAlias({"user_id"})
    public String userId;

    @JsonProperty
    @NotNull
    @JsonAlias({"is_repeat"})
    public Boolean isRepeat;

    @JsonProperty
    @NotNull
    @JsonAlias({"start_date"})
    public LocalDate startDate;

    @JsonProperty
    @Valid
    public RepetitionVo repeat;
}
