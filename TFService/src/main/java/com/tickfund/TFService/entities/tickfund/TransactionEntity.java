package com.tickfund.TFService.entities.tickfund;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tickfund.TFService.commons.enums.CategoryType;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
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

    public LocalDate getHistory() {
        return history;
    }

    public void setHistory(LocalDate history) {
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
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
    private LocalDate history;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    @JsonAlias({"category_type"})
    private CategoryType categoryType;
    @Column(name = "category_name")
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
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "transactionEntity", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<AttachmentEntity> attachments = new HashSet<>();
}
