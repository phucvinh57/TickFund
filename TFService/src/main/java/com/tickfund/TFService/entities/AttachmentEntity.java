package com.tickfund.TFService.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import javax.persistence.ManyToOne;

@Entity
@Table(schema = "tickfund", name = "attachment")
public class AttachmentEntity {
    @Id
    public Integer attachmentId;

    @Column
    public String url;

    @ManyToOne
    @JoinColumn(name = "transaction_id")
    public TransactionEntity transactionEntity;
}
