package com.tickfund.TFService.dtos.in.user;

import java.util.ArrayList;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdatePermissionDto {
    @JsonProperty
    @NotNull
    @Min(value = 1)
    public Integer roleId;

    public ArrayList<ResourceActionMapping> mappings;

    public class ResourceActionMapping {
        @JsonProperty
        @NotNull
        @Min(value = 1)
        public Integer resourceId;
    
    
        @JsonProperty
        @NotNull
        @Min(value = 1)
        public Integer actionId; 
    }
}
