package com.tickfund.TFService.dtos.out;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CategoryType;
import com.tickfund.TFService.entities.AttachmentEntity;
import com.tickfund.TFService.entities.TransactionEntity;
import com.tickfund.TFService.modules.ObjectCaster;

public class TransactionOut {
    @JsonProperty
    private String ID;
    @JsonProperty
    private Integer amount;

    @JsonProperty
    private Date history;

    @JsonProperty("category_type")
    private CategoryType categoryType;
    @JsonProperty("category_name")
    private String categoryName;

    @JsonProperty("user_id")
    private String userId;

    @JsonProperty("creator_id")
    private String creatorId;

    @JsonProperty
    private String note;

    @JsonProperty("create_at")
    private Date createdAt;

    @JsonProperty
    private Set<String> attachmentIds = new HashSet<>();

    public TransactionOut(TransactionEntity entity) {
        this.ID = entity.getID();
        this.amount = entity.getAmount();
        this.history = entity.getHistory();
        this.categoryName = entity.getCategoryName();
        this.categoryType = entity.getCategoryType();
        this.userId = entity.getUserId();
        this.creatorId = entity.getCreatorId();
        this.note = entity.getNote();
        this.createdAt = entity.getCreatedAt();
        this.attachmentIds = entity.getAttachments().stream().map(attachmentEntity -> attachmentEntity.getID()).collect(Collectors.toSet());;
    }
}
