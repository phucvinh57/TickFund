package com.example.TFService.modules.planning.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.TFService.modules.planning.vo.PlanningRepetitionVO;
import com.example.TFService.modules.planning.vo.in.PlanningVO;
import com.example.TFService.modules.planning.vo.PlanningCycleVO;
import com.example.TFService.commons.enums.CycleEnum;
import com.example.TFService.commons.enums.RepetitionModeEnum;
import com.example.TFService.modules.planning.entity.Planning;

import java.util.ArrayList;

@RestController
@RequestMapping("/plannings")
public class PlanningController {
	@GetMapping("")
	@ResponseBody
	public ArrayList<String> getPlannings() {
		return new ArrayList<>();
	}

	@GetMapping("/{id}")
	@ResponseBody
	public Planning getPlanningById(@PathVariable String id) {
		Planning.Builder dataBuilder = new Planning.Builder();

		PlanningRepetitionVO.Builder repeatBuilder = new PlanningRepetitionVO.Builder();
		PlanningRepetitionVO repeat = repeatBuilder.setCycle(
				new PlanningCycleVO(
						CycleEnum.DAY,
						"2022-07-05 15:30",
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
	public String updatePlanningById(
			@PathVariable String id,
			@RequestBody PlanningVO data) {
		return id;
	}

	@PostMapping("")
	@ResponseBody
	public PlanningVO createPlanningById(
			@RequestBody PlanningVO data) {
		return data;
	}

	@DeleteMapping("/{id}")
	public String deletePlanningById(@PathVariable String id) {
		return id;
	}
}