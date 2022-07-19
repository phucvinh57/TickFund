package com.tickfund.TFService.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.tickfund.TFService.commons.enums.CycleEnum;

@Entity
@Table(name = "planning")
public class Planning {
    @Id
    private String ID;

    @Column
    private Integer amount;

    @Column
    private Boolean hasEndDay;

    @Column
    private String userID;
    
    @Column
    private Boolean isRepeat;

    @Column
    @Enumerated(EnumType.STRING)
    private CycleEnum cycleUnit;

    // @Column

}
