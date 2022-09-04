package com.tickfund.TFService.dtos.in.user;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ChangeDepartmentDto {
    @JsonAlias({"department_id", "departmentID"})
    @JsonProperty
    public Integer departmentId;
}
