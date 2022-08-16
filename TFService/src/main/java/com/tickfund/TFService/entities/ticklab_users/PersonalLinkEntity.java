package com.tickfund.TFService.entities.ticklab_users;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(schema = "ticklab_users", name = "personal_link")
public class PersonalLinkEntity {
    @Id
    public Integer ID;

    @Column(nullable = false)
    public String url;

    @ManyToOne
    @JoinColumn(name = "account_id")
    @JsonBackReference
    public TickLabUserEntity ticklabUser;
}
