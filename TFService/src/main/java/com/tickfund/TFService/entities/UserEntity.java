package com.tickfund.TFService.entities;

import java.util.Set;

import javax.persistence.*;

@Entity
@Table(schema = "tickfund", name = "user")
public class UserEntity {
    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public Set<PlanningEntity> getPlanningEntities() {
        return planningEntities;
    }

    public void setPlanningEntities(Set<PlanningEntity> planningEntities) {
        this.planningEntities = planningEntities;
    }

    @Id
    String ID;

    @OneToMany(mappedBy = "ID")
    Set<PlanningEntity> planningEntities;

    public RoleEntity getRoleEntity() {
        return roleEntity;
    }

    public void setRoleEntity(RoleEntity roleEntity) {
        this.roleEntity = roleEntity;
    }

    @OneToOne
    @JoinColumn(name = "role_id")
    RoleEntity roleEntity;
}
