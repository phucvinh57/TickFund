package com.tickfund.TFService.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
    @Column(name = "ID")
    private String ID;

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public TransactionEntity getTransactionEntity() {
        return transactionEntity;
    }

    public void setTransactionEntity(TransactionEntity transactionEntity) {
        this.transactionEntity = transactionEntity;
    }

    @Column
    private String url;

    @ManyToOne
    @JoinColumn(name = "transaction_id")
    @JsonBackReference
    private TransactionEntity transactionEntity;
}
