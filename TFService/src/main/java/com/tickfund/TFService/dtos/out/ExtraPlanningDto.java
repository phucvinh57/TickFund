package com.tickfund.TFService.dtos.out;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.vos.RepetitionVo;
import com.tickfund.TFService.utils.ObjectCaster;
import com.tickfund.TFService.commons.enums.CycleEnum;
import com.tickfund.TFService.commons.enums.RepetitionModeEnum;
import com.tickfund.TFService.commons.vos.CycleVo;

public class ExtraPlanningDto {
    private enum ParamName {
        USER_ID,
        IS_REPEAT,
        CYCLE_MODE,
        CYCLE_UNIT,
        HAS_END_DATE,
        END_DATE,
        COUNTDOWN
    }

    @JsonProperty
    public String userId;

    @JsonProperty
    public Boolean isRepeat;

    @JsonProperty
    public RepetitionVo repeat;

    public ExtraPlanningDto(ArrayList<Object> queryData) {
        try {
            String userId = ObjectCaster.toString(
                    queryData.get(ParamName.USER_ID.ordinal()));

            Boolean isRepeat = ObjectCaster.toBoolean(
                    queryData.get(ParamName.IS_REPEAT.ordinal()));

            RepetitionVo repeat = new RepetitionVo();

            RepetitionModeEnum cycleMode = ObjectCaster.toEnum(
                    RepetitionModeEnum.class,
                    queryData.get(ParamName.CYCLE_MODE.ordinal()));

            CycleEnum cycleUnit = ObjectCaster.toEnum(
                    CycleEnum.class,
                    queryData.get(ParamName.CYCLE_UNIT.ordinal()));

            Boolean hasEndDate = ObjectCaster.toBoolean(
                    queryData.get(ParamName.HAS_END_DATE.ordinal()));

            Date endDate = ObjectCaster.toDate(
                    "yyyy-MM-dd", queryData.get(ParamName.END_DATE.ordinal()));

            repeat.mode = cycleMode;
            repeat.cycle = new CycleVo(cycleUnit, hasEndDate, endDate);

            repeat.countdown = ObjectCaster.toInteger(
                    queryData.get(ParamName.COUNTDOWN.ordinal()));

            this.userId = userId;
            this.isRepeat = isRepeat;
            this.repeat = repeat;
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal Server Error",
                    e);
        }

    }
}
