package com.tickfund.TFService.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(schema = "tickfund", name = "user")
public class UserEntity {
    @Id
    public Integer ID;

    @OneToMany(mappedBy = "ID")
    public Set<PlanningEntity> planningEntities;

    
}
