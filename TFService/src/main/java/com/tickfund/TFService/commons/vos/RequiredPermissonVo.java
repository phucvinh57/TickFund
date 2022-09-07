package com.tickfund.TFService.commons.vos;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class RequiredPermissonVo {
    @NotNull
    @Min(value = 1)
    public Integer resourceId;

    @NotNull
    @Min(value = 1)
    public Integer actionId;

    public RequiredPermissonVo(Integer resourceId, Integer actionId) {
        this.resourceId = resourceId;
        this.actionId = actionId;
    }
}
