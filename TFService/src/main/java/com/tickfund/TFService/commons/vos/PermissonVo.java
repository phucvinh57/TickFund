package com.tickfund.TFService.commons.vos;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class PermissonVo {
    @NotNull
    @Min(value = 1)
    public Integer roleId;

    @NotNull
    @Min(value = 1)
    public Integer resourceId;

    @NotNull
    @Min(value = 1)
    public Integer actionId;
}
