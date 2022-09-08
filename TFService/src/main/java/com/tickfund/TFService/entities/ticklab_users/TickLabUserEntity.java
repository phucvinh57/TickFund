package com.tickfund.TFService.entities.ticklab_users;

import java.time.LocalDate;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tickfund.TFService.commons.enums.ExpertiseEnum;
import com.tickfund.TFService.dtos.in.user.UpdateUserDto;

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
    public LocalDate birthday;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    public ExpertiseEnum expertise;

    @Column(nullable = false)
    public Boolean active;

    @ManyToOne
    @JoinColumn(name = "department_id")
    @Nullable
    public DepartmentEntity department;

    @OneToMany(mappedBy = "ticklabUser", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    public Set<PersonalLinkEntity> personalLinks;

    public void setBasicInfo(UpdateUserDto dto) {
        this.active = dto.active;
        this.avatarURL = null;
        this.birthday = null;
        this.email = dto.email;
        this.expertise = dto.expertise;
        this.name = dto.name;
        this.phone = dto.phone;
    }

    public void setDepartment(DepartmentEntity department) {
        this.department = department;
    }
}