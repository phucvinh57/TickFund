package com.tickfund.TFService.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tickfund.TFService.commons.enums.CategoryType;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Table(schema = "tickfund", name = "transaction")
public class TransactionEntity {
    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Date getHistory() {
        return history;
    }

    public void setHistory(Date history) {
        this.history = history;
    }

    public CategoryType getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(CategoryType categoryType) {
        this.categoryType = categoryType;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Set<AttachmentEntity> getAttachments() {
        return attachments;
    }

    public void setAttachments(Set<AttachmentEntity> attachments) {
        this.attachments = attachments;
    }

    @Id
    private String ID;

    @Column()
    @Min(value = 0)
    @NotNull
    private Integer amount;

    @Column
    @Temporal(TemporalType.DATE)
    private Date history;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private CategoryType categoryType;
    @Column(length = 255)
    @NotNull
    @JsonAlias({"category_name"})
    private String categoryName;

    @Column(name = "user_id")
    @JsonAlias({"user_id"})
    private String userId;

    @Column(name = "creator_id")
    @JsonAlias({"creator_id"})
    @NotNull
    private String creatorId;

    @Column
    private String note;

    @Column(name = "created_at", insertable = false)
    @JsonAlias({"created_at"})
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @OneToMany(mappedBy = "transactionEntity", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<AttachmentEntity> attachments = new HashSet<>();
}
