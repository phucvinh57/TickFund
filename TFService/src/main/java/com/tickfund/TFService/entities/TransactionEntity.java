package com.tickfund.TFService.entities;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.tickfund.TFService.commons.enums.CategoryType;

@Entity
@Table(schema = "tickfund", name = "transaction")
public class TransactionEntity {
    @Id
    public Integer ID;

    @Column()
    @Min(value = 0)
    @NotNull
    public Integer amount;

    @Column
    @NotNull
    public Date history;

    @Column(length = 255)
    @NotNull
    public String categoryName;

    @Column
    public Integer userId;

    @Column
    @NotNull
    public Integer creatorId;

    @Column
    @Enumerated(EnumType.STRING)
    public CategoryType type;

    @Column
    public String note;

    @Column
    @NotNull
    public Date createdAt;

    @OneToMany(mappedBy = "attachmentId")
    public Set<AttachmentEntity> attachments; 
}
