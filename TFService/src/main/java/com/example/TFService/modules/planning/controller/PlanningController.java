package com.example.TFService.modules.planning.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.TFService.enums.CycleEnum;
import com.example.TFService.enums.RepetitionModeEnum;
import com.example.TFService.modules.planning.dto.PlanningRepetitionDTO;
import com.example.TFService.modules.planning.dto.in.PlanningUpdateDTO;
import com.example.TFService.modules.planning.dto.out.PlanningCycle;
import com.example.TFService.modules.planning.dto.out.PlanningDTO;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/plannings")
public class PlanningController {
    @GetMapping("/{id}")
    @ResponseBody
    public PlanningDTO getPlanningById(@PathVariable String id) {
        PlanningDTO.Builder dataBuilder = new PlanningDTO.Builder();

        PlanningRepetitionDTO.Builder repeatBuilder = new PlanningRepetitionDTO.Builder();
        PlanningRepetitionDTO repeat = repeatBuilder.setCycle(
                new PlanningCycle(
                        CycleEnum.DAY,
                        LocalDateTime.now(),
                        false))
                .setMode(RepetitionModeEnum.COUNTDOWN)
                .setCountdown(15)
                .getResult();

        return dataBuilder.setPlanningID(id)
                .setUserID("userID")
                .setIsRepeat(false)
                .setPlanningRepetitionDTO(repeat)
                .getResult();
    }

    @PutMapping("/{id}")
    @ResponseBody
    public PlanningUpdateDTO updatePlanningById(
            @PathVariable String id,
            @RequestBody PlanningUpdateDTO data) {
        return data;
    }
}