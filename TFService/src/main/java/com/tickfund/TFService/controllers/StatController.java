package com.tickfund.TFService.controllers;

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
    public StatOut getTransactionsStat(StatDTO options) {
        options.setPeriod_type(options.getPeriod_type().toUpperCase());
        return this.statService.getStatistic(options);
    }
}
