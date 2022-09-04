package com.tickfund.TFService.dtos.in.user;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ChangeRoleDto {
    @JsonProperty
    @JsonAlias({"roleID, role_id"})
    public Integer roleId;
}
