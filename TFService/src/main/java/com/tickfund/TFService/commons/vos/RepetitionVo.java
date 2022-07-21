package com.tickfund.TFService.commons.vos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.enums.RepetitionModeEnum;

public class RepetitionVo {
    @JsonProperty
    public RepetitionModeEnum mode;

    @JsonProperty
    public CycleVo cycle;

    @JsonProperty
    public Integer countdown;
}
