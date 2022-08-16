package com.tickfund.TFService.entities.ticklab_users;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tickfund.TFService.commons.enums.ExpertiseEnum;

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

    @Column(nullable = false)
    public String password;

    @Column
    public String avatarURL;

    @Column
    public Date birthday;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    public ExpertiseEnum expertise;

    @Column(nullable = false)
    public Boolean active;

    @ManyToOne
    @JoinColumn(name = "dname")
    public DepartmentEntity department;

    @OneToMany(targetEntity = PersonalLinkEntity.class)
    @JsonManagedReference
    public Set<PersonalLinkEntity> personalLinks;
}