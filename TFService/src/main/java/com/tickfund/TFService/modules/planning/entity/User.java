package com.tickfund.TFService.modules.planning.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.tickfund.TFService.commons.enums.DepartmentEnum;
import com.tickfund.TFService.commons.enums.MajorEnum;

@Entity
@Table(
    name = "user"
)
public class User {
    @Id
    private String ID;

    @Column(unique = true, nullable = false)
    private String username;

    @Column()
    private String password;

    @Column(unique = true, nullable = false, length = 50)
    private String email;

    @Column(length = 11)
    private String phone;

    @Column
    private String avatar;

    @Column
    private Date birthday;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DepartmentEnum department;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MajorEnum major;
}