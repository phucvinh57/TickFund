package com.tickfund.TFService.dtos.out.users;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.ExpertiseEnum;

public class UserDto {
    @JsonProperty
    @NotBlank
    public String ID;

    @JsonProperty
    public String name;

    @JsonProperty
    public String username;

    @JsonProperty
    public String avatarUrl;

    @JsonProperty
    public ExpertiseEnum expertise;

    @JsonProperty
    public Object role;

    @JsonProperty
    public Boolean active;

    @JsonProperty
    public Object department;

    public UserDto(TicklabUserDto ticklabUser, TickfundUserWithRoleDto tickfundUserWithRole) {
        this.ID = ticklabUser.ID;
        this.name = ticklabUser.name;
        this.username = ticklabUser.username;
        this.expertise = ticklabUser.expertise;
        this.department = ticklabUser.department;
        this.active = ticklabUser.active;
        this.avatarUrl = ticklabUser.avatarUrl;

        this.role = tickfundUserWithRole.role;
    }
}
