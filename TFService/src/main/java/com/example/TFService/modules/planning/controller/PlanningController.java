package com.example.TFService.modules.planning.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.TFService.modules.planning.vo.PlanningRepetitionVO;
import com.example.TFService.modules.planning.vo.in.PlanningUpdateVO;
import com.example.TFService.modules.planning.vo.PlanningCycleVO;
import com.example.TFService.common.enums.CycleEnum;
import com.example.TFService.common.enums.RepetitionModeEnum;
import com.example.TFService.modules.planning.entity.Planning;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/plannings")
public class PlanningController {
    @GetMapping("/{id}")
    @ResponseBody
    public Planning getPlanningById(@PathVariable String id) {
        Planning.Builder dataBuilder = new Planning.Builder();

        PlanningRepetitionVO.Builder repeatBuilder = new PlanningRepetitionVO.Builder();
        PlanningRepetitionVO repeat = repeatBuilder.setCycle(
                new PlanningCycleVO(
                        CycleEnum.DAY,
                        LocalDateTime.now(),
                        false))
                .setMode(RepetitionModeEnum.COUNTDOWN)
                .setCountdown(15)
                .build();

        return dataBuilder.setPlanningID(id)
                .setUserID("userID")
                .setIsRepeat(false)
                .setPlanningRepetitionDTO(repeat)
                .build();
    }

    @PutMapping("/{id}")
    @ResponseBody
    public PlanningUpdateVO updatePlanningById(
            @PathVariable String id,
            @RequestBody PlanningUpdateVO data) {
        return data;
    }
}