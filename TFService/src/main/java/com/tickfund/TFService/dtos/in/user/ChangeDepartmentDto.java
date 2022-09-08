package com.tickfund.TFService.dtos.in.user;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ChangeDepartmentDto {
    @JsonProperty
    @JsonAlias({"userID, user_id"})
    public String userId;

    @JsonAlias({"department_id", "departmentID"})
    @JsonProperty
    public Integer departmentId;
}
