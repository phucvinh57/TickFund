package com.tickfund.TFService.controllers;

import com.tickfund.TFService.commons.enums.CycleEnum;
import com.tickfund.TFService.dtos.in.StatDTO;
import com.tickfund.TFService.dtos.out.StatOut;
import com.tickfund.TFService.services.StatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stat")
public class StatController {

    @Autowired
    StatService statService;

    @GetMapping("")
    @ResponseBody
    public StatOut getTransactionsStat(@RequestParam("period_type")CycleEnum periodType, StatDTO options) {
        // Must do some trick here because spring boot cannot parse string to enum in statDTO
        options.setPeriodType(periodType);
        return this.statService.getStatistic(options);
    }
}
