package com.tickfund.TFService.dtos.in.transaction;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.dtos.validator.transaction.AttachmentConstraint;
import com.tickfund.TFService.dtos.validator.transaction.CategoryNameConstraint;
import com.tickfund.TFService.dtos.validator.user.UserIDConstraint;

import javax.persistence.Column;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

public class TransactionDTO {

    @Min(value = 0)
    @NotNull
    @JsonProperty
    public Integer amount;

    @NotNull
    public Date history;

    @NotNull
    @JsonAlias({"category_name"})
    @CategoryNameConstraint
    @JsonProperty
    public String categoryName;

    @JsonAlias({"user_id"})
    @UserIDConstraint
    @NotNull
    @JsonProperty
    public String userId;

    @JsonAlias({"creator_id"})
    @UserIDConstraint
    @NotNull
    @JsonProperty
    public String creatorId;

    @Column
    @JsonProperty
    public String note;

    @JsonAlias({"created_at"})
    @JsonProperty
    public Date createdAt;

    @AttachmentConstraint
    @JsonProperty
    public Set<String> attachments;
}
