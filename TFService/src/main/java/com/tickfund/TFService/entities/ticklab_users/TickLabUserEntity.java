package com.tickfund.TFService.entities.ticklab_users;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(schema = "ticklab_users", name = "account")
public class TickLabUserEntity {
    @Id
    public String ID;

    @Column(unique = true, nullable = false)
    public String username;

    @Column(nullable = false, length = 255)
    public String name;

    @Column(length = 15)
    public String phone;

    @Column(unique = true, nullable = false, length = 50)
    public String email;

    @Column
    public String password;

    @Column
    public String avatarURL;

    @Column
    public Date birthday;

    @ManyToOne
    @JoinColumn(name = "dname")
    public DepartmentEntity department;
}