package com.tickfund.TFService.entities.tickfund;

import com.tickfund.TFService.commons.enums.CategoryType;
import com.tickfund.TFService.commons.enums.CycleEnum;
import com.tickfund.TFService.dtos.in.PlanningDto;
import com.tickfund.TFService.utils.UniqueId;

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
    public String ID;

    @Column
    @Min(value = 0)
    public Integer amount;

    @Column(name = "start_date", columnDefinition = "DATE")
    public LocalDate startDate;

    @Column(name = "next_due", columnDefinition = "DATE")
    public LocalDate nextDueDate;

    @Column(name = "is_repeat")
    public Boolean isRepeat;

    @Column(name = "cycle_unit")
    @Enumerated(EnumType.STRING)
    public CycleEnum cycleUnit;

    @Column(name = "end_date", columnDefinition = "DATE")
    public LocalDate endDate;
    
    @Column
    @Min(value = 0)
    public Integer countdown;

    @Column(name = "category_name")
    public String categoryName;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    public CategoryType categoryType;

    @ManyToOne
    @JoinColumn(name = "user_id")
    public UserEntity user;

    public PlanningEntity() {}

    public PlanningEntity(PlanningDto dto) {
        this.amount = dto.amount;
        this.startDate = dto.startDate;
        this.isRepeat = dto.isRepeat;
        this.categoryName = dto.categoryName;
        this.categoryType = null;

        if(dto.repeat != null) {
            this.cycleUnit = dto.repeat.cycle.cycle;
            this.endDate = dto.repeat.cycle.endDate;
            this.countdown = dto.repeat.countdown;
        }
    }

    public void setId() {
        this.ID = UniqueId.generate("vinh.np");
    }

    public void setId(String ID) {
        this.ID = ID;
    }
}
