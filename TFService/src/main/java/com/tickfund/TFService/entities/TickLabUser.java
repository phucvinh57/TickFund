package com.tickfund.TFService.entities;

import com.tickfund.TFService.commons.enums.DepartmentEnum;
import com.tickfund.TFService.commons.enums.MajorEnum;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(schema = "ticklab_users", name = "user")
public class TickLabUser {
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