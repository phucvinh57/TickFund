package com.tickfund.TFService.dtos.out;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.commons.vos.RepetitionVo;
import com.tickfund.TFService.commons.enums.CycleEnum;
import com.tickfund.TFService.commons.enums.RepetitionModeEnum;
import com.tickfund.TFService.commons.vos.CycleVo;

enum ParamName {
    USER_ID,
    IS_REPEAT,
    CYCLE_MODE,
    CYCLE_UNIT,
    HAS_END_DATE,
    END_DATE,
    COUNTDOWN
}

public class ExtraPlanningDto {
    @JsonProperty
    public String userId;

    @JsonProperty
    public Boolean isRepeat;

    @JsonProperty
    public RepetitionVo repeat;

    public ExtraPlanningDto(ArrayList<Object> queryData) {
        try {
            Object userIdData = queryData.get(ParamName.USER_ID.ordinal());
            String userId = userIdData == null ? null : String.valueOf(userIdData);

            Boolean isRepeat = Boolean.valueOf(queryData.get(ParamName.IS_REPEAT.ordinal()).toString());

            RepetitionVo repeat = new RepetitionVo();

            Object cycleModeData = queryData.get(ParamName.CYCLE_MODE.ordinal());
            RepetitionModeEnum cycleMode = cycleModeData == null ? null
                    : RepetitionModeEnum.valueOf(String.valueOf(cycleModeData));

            Object cycleUnitData = queryData.get(ParamName.CYCLE_UNIT.ordinal());
            CycleEnum cycleUnit = cycleUnitData == null ? null : CycleEnum.valueOf(cycleUnitData.toString());

            Object hasEndDateData = queryData.get(ParamName.HAS_END_DATE.ordinal());
            Boolean hasEndDate = hasEndDateData == null ? null : Boolean.valueOf(hasEndDateData.toString());

            Object endDateData = queryData.get(ParamName.END_DATE.ordinal());
            Date endDate = endDateData == null ? null
                    : new SimpleDateFormat("yyyy-MM-dd")
                            .parse(endDateData.toString());

            repeat.mode = cycleMode;
            repeat.cycle = new CycleVo(cycleUnit, hasEndDate, endDate);

            Object countdownData = queryData.get(ParamName.COUNTDOWN.ordinal());
            repeat.countdown = countdownData == null ? null
                    : Integer.valueOf(countdownData.toString());

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
