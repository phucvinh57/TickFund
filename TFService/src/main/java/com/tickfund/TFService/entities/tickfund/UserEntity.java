package com.tickfund.TFService.entities.tickfund;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(schema = "tickfund", name = "user")
public class UserEntity {
    @Id
    public String ID;
}
