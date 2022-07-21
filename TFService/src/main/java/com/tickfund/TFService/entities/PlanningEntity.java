package com.tickfund.TFService.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;

import com.tickfund.TFService.commons.enums.CategoryType;
import com.tickfund.TFService.commons.enums.CycleEnum;
import com.tickfund.TFService.dtos.NewPlanningDto;

@Entity
@Table(
    schema = "tickfund",
    name = "planning"
)
public class PlanningEntity {
    @Id
    public String ID;

    @Column
    @Min(value = 0)
    public Integer amount;

    @Column
    public Date startDate; 

    @Column
    public Boolean isRepeat;

    @Column
    @Enumerated(EnumType.STRING)
    public CycleEnum cycleUnit;

    @Column
    public Date endDate;
    
    @Column
    @Min(value = 0)
    public Integer countdown;

    @Column
    public String categoryName;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    public CategoryType categoryType;

    @ManyToOne
    @JoinColumn(name = "user_id")
    public UserEntity user;

    public PlanningEntity() {}

    public PlanningEntity(NewPlanningDto dto) {
        this.amount = dto.amount;
        this.startDate = dto.startDate;
        this.isRepeat = dto.isRepeat;
        
        this.cycleUnit = dto.repeat.cycle.cycle;
        this.endDate = dto.repeat.cycle.endDate;
        this.countdown = dto.repeat.countdown;
        this.categoryName = dto.category.name;
        this.categoryType = dto.category.type;
    }
}
