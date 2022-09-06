package com.tickfund.TFService.dtos.in.user;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ChangeUserRoleDto {
    @JsonProperty
    @JsonAlias({"userID, user_id"})
    public String userId;

    @JsonProperty
    @JsonAlias({"roleID, role_id"})
    public Integer roleId;
}
