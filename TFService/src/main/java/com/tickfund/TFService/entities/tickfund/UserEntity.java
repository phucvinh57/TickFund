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

    public RoleEntity getRole() {
        return role;
    }

    public void setRole(RoleEntity role) {
        this.role = role;
    }
    @Id
    String ID;

    @ManyToOne
    @JoinColumn(name = "role_id")
    RoleEntity role;
}
