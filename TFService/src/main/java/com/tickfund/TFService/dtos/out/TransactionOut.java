package com.tickfund.TFService.dtos.out;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.CategoryType;
import com.tickfund.TFService.entities.tickfund.AttachmentEntity;
import com.tickfund.TFService.entities.tickfund.TransactionEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TransactionOut {
    @JsonProperty
    private String ID;
    @JsonProperty
    private Integer amount;

    @JsonProperty
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate history;

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

    @JsonProperty("created_at")
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime createdAt;

    @JsonProperty("attachments")
    private List<AttachmentOut> attachmentIds = new ArrayList<>();

    public TransactionOut(TransactionEntity transactionEntity, String fakeAttachmentDomain) {
        this.ID = transactionEntity.getID();
        this.amount = transactionEntity.getAmount();
        this.history = transactionEntity.getHistory();
        this.categoryName = transactionEntity.getCategoryName();
        this.categoryType = transactionEntity.getCategoryType();
        this.userId = transactionEntity.getUserId();
        this.creatorId = transactionEntity.getCreatorId();
        this.note = transactionEntity.getNote();
        this.createdAt = transactionEntity.getCreatedAt();

        for(AttachmentEntity attachmentEntity : transactionEntity.getAttachments()){
            AttachmentOut attachmentOut = new AttachmentOut();
            attachmentOut.setID(attachmentEntity.getID());
            String fileName = attachmentEntity.getName();
            String fakeFileUrl = "http://%s/attachments/%s".formatted(fakeAttachmentDomain, attachmentEntity.getID());

            attachmentOut.setPath(fakeFileUrl);

            attachmentOut.setName(fileName);

            this.attachmentIds.add(attachmentOut);
        }
    }
}
