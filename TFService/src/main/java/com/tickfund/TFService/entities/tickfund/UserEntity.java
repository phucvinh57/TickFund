package com.tickfund.TFService.entities.tickfund;

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
    @Id
    public String ID;
    public RoleEntity getRoleEntity() {
        return role;
    }

    public void setRoleEntity(RoleEntity roleEntity) {
        this.role = roleEntity;
    }

    @ManyToOne
    @JoinColumn(name = "role_id")
    public RoleEntity role;
}
