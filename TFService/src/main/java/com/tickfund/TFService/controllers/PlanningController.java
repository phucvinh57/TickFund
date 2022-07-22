package com.tickfund.TFService.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tickfund.TFService.dtos.in.PlanningDto;
import com.tickfund.TFService.dtos.out.ExtraPlanningDto;
import com.tickfund.TFService.services.PlanningService;

import java.util.ArrayList;

import javax.validation.Valid;

@RestController
@RequestMapping("/plannings")
public class PlanningController {
	@Autowired
	private PlanningService service;

	// TODO
	@GetMapping("")
	@ResponseBody
	public ArrayList<Object> getPlannings() {
		return new ArrayList<>();
	}

	@GetMapping("/{id}")
	@ResponseBody
	public ExtraPlanningDto getPlanningById(@PathVariable(name = "id") String planningId) {
		ExtraPlanningDto result = this.service.getExtraPlanningDataById(planningId);
		return result;
	}

	@PutMapping("/{id}")
	@ResponseBody
	public String updatePlanningById(
			@PathVariable(name = "id") String ID,
			@Valid @RequestBody PlanningDto planningDto) {
		return this.service.updateById(ID, planningDto);
	}

	@PostMapping("")
	@ResponseBody
	public String createPlanning(
		@Valid @RequestBody PlanningDto newPlanning
	) {
		String planningId = this.service.create(newPlanning);
		return planningId;
	}

	@DeleteMapping("/{id}")
	public String deletePlanningById(@PathVariable(name = "id") String ID) {
		this.service.deleteById(ID);
		return ID;
	}
}