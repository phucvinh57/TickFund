package com.tickfund.TFService.entities.tickfund;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.tickfund.TFService.commons.enums.CycleEnum;
import com.tickfund.TFService.dtos.in.planning.PlanningDto;

import javax.persistence.*;
import javax.validation.constraints.Min;
import java.time.LocalDate;

@Entity
@Table(
    schema = "tickfund",
    name = "planning"
)
public class PlanningEntity {
    @Id
    private String ID;

    @Column
    @Min(value = 0)
    private Integer amount;

    @Column(name = "start_date", columnDefinition = "DATE")
    @JsonAlias({"start_date"})
    private LocalDate startDate;

    @Column(name = "next_due", columnDefinition = "DATE")
    @JsonAlias({"next_due_date"})
    private LocalDate nextDueDate;

    @Column(name = "is_repeat")
    @JsonAlias({"is_repeat"})
    private Boolean isRepeat;

    @Column(name = "cycle_unit")
    @Enumerated(EnumType.STRING)
    @JsonAlias({"cycle_unit"})
    private CycleEnum cycleUnit;

    @Column(name = "end_date", columnDefinition = "DATE")
    @JsonAlias({""})
    private LocalDate endDate;
    
    @Column
    @Min(value = 0)
    private Integer countdown;

    @Column(name = "category_name")
    private String categoryName;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "user_id", insertable = false, updatable = false)
    @JsonAlias({"user_id"})
    // for search only
    String userId;

    public PlanningEntity() {}

    public PlanningEntity(PlanningDto dto) {
        this.setAmount(dto.amount);
        this.setStartDate(dto.startDate);
        this.setRepeat(dto.isRepeat);
        this.setCategoryName(dto.categoryName);

        if(dto.repeat != null) {
            this.setCycleUnit(dto.repeat.cycle);
            this.setEndDate(dto.repeat.endDate);
            this.setCountdown(dto.repeat.countdown);
        }
    }
    public void setID(String ID) {
        this.ID = ID;
    }

    public String getID() {
        return ID;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getNextDueDate() {
        return nextDueDate;
    }

    public void setNextDueDate(LocalDate nextDueDate) {
        this.nextDueDate = nextDueDate;
    }

    public Boolean getRepeat() {
        return isRepeat;
    }

    public void setRepeat(Boolean repeat) {
        isRepeat = repeat;
    }

    public CycleEnum getCycleUnit() {
        return cycleUnit;
    }

    public void setCycleUnit(CycleEnum cycleUnit) {
        this.cycleUnit = cycleUnit;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getCountdown() {
        return countdown;
    }

    public void setCountdown(Integer countdown) {
        this.countdown = countdown;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
