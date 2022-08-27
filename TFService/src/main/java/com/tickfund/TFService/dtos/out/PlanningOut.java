package com.tickfund.TFService.dtos.out;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CategoryType;
import com.tickfund.TFService.commons.enums.CycleEnum;
import com.tickfund.TFService.entities.tickfund.PlanningEntity;

import java.time.LocalDate;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlanningOut {
    @JsonProperty
    String ID;

    @JsonProperty
    Integer amount;

    @JsonProperty("start_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    LocalDate startDate;

    @JsonProperty("next_due")
    @JsonFormat(pattern="yyyy-MM-dd")
    LocalDate nextDueDate;

    @JsonProperty("is_repeat")
    Boolean isRepeat;

    @JsonProperty("cycle_unit")
    CycleEnum cycleUnit;

    @JsonProperty("end_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    LocalDate endDate;

    @JsonProperty
    Integer countdown;

    @JsonProperty("category_name")
    String categoryName;

    @JsonProperty("category_type")
    CategoryType categoryType;

    @JsonProperty("user_id")
    String userId;

    public PlanningOut(PlanningEntity planningEntity){
        this.ID = planningEntity.getID();
        this.amount = planningEntity.getAmount();
        this.startDate = planningEntity.getStartDate();
        this.nextDueDate = planningEntity.getNextDueDate();
        this.isRepeat = planningEntity.getRepeat();
        this.cycleUnit = planningEntity.getCycleUnit();
        this.endDate = planningEntity.getEndDate();
        this.countdown = planningEntity.getCountdown();
        this.categoryName = planningEntity.getCategoryName();
        this.userId = planningEntity.getUser().getID();
    }
}
