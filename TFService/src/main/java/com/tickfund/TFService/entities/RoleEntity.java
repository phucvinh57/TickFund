package com.tickfund.TFService.entities;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(schema = "tickfund", name = "role")
public class RoleEntity {
    public Integer getID() {
        return ID;
    }

    public void setID(Integer ID) {
        this.ID = ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Id
    Integer ID;

    @Column
    public String name;
}
