package com.tickfund.TFService.entities.tickfund;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.tickfund.TFService.entities.composite_ids.ResourceActionMappingEntityId;

@Entity
@Table(schema = "tickfund", name = "resouce_action")
@IdClass(ResourceActionMappingEntityId.class)
public class ResourceActionMappingEntity {
    @Id
    @Column(name = "resource_id", insertable = false, updatable = false)
    private Integer resourceId;

    @Id
    @Column(name = "action_id", insertable = false, updatable = false)
    private Integer actionId;

    @ManyToOne
    @JoinColumn(name = "resource_id")
    public ResourceEntity resource;

    @ManyToOne
    @JoinColumn(name = "action")
    public ActionEntity action;
}
