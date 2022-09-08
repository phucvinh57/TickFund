package com.tickfund.TFService.entities.tickfund;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(schema = "tickfund", name = "action")
public class ActionEntity {
    @Id
    public Integer ID;

    @Column(nullable = false, unique = true)
    public String name;
}
