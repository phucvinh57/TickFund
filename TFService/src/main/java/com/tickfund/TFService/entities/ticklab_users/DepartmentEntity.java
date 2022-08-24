package com.tickfund.TFService.entities.ticklab_users;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;

@Entity
@Table(schema = "ticklab_users", name = "department")
public class DepartmentEntity {
    @Id
    public Integer ID;

    @Column(nullable = false, unique = true)
    public String name;
}
