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

public class ExtraPlanningDto {
    @JsonProperty
    public String userId;

    @JsonProperty
    public Boolean isRepeat;

    @JsonProperty
    public RepetitionVo repeat;

    public ExtraPlanningDto(ArrayList<Object> queryData) {
        try {
            String userId = String.valueOf(queryData.get(0));
            Boolean isRepeat = Boolean.valueOf(queryData.get(1).toString());

            RepetitionVo repeat = new RepetitionVo();

            // cycle_mode
            RepetitionModeEnum cycleMode = RepetitionModeEnum.valueOf(
                    String.valueOf(queryData.get(2)));

            CycleEnum cycleUnit = CycleEnum.valueOf(String.valueOf(queryData.get(3)));
            Boolean hasEndDate = Boolean.valueOf(queryData.get(4).toString());
            Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse(queryData.get(5).toString());
            repeat.mode = cycleMode;
            repeat.cycle = new CycleVo(cycleUnit, hasEndDate, endDate);

            // countdown
            repeat.countdown = Integer.valueOf(queryData.get(6).toString());

            this.userId = userId;
            this.isRepeat = isRepeat;
            this.repeat = repeat;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", e);
        }

    }
}
