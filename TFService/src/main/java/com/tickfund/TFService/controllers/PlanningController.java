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

import com.tickfund.TFService.dtos.NewPlanningDto;
import com.tickfund.TFService.entities.PlanningEntity;
import com.tickfund.TFService.repository.PlanningRepository;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/plannings")
public class PlanningController {
	@Autowired
	private PlanningRepository repo;

	@GetMapping("")
	@ResponseBody
	public ArrayList<String> getPlannings() {
		return new ArrayList<>();
	}

	@GetMapping("/{id}")
	@ResponseBody
	public PlanningEntity getPlanningById(@PathVariable String id) {
		Optional<PlanningEntity> result = this.repo.findById(1);
		if(result.isEmpty()) {
			return null;
		}

		return result.get();
	}

	@PutMapping("/{id}")
	@ResponseBody
	public String updatePlanningById(
			@PathVariable String id,
			@RequestBody String data) {
		return id;
	}

	@PostMapping("")
	@ResponseBody
	public Integer createPlanning(
		@RequestBody NewPlanningDto newPlanning
	) {
		PlanningEntity planning = new PlanningEntity(newPlanning);
		this.repo.save(planning);
		return planning.ID;
	}

	@DeleteMapping("/{id}")
	public String deletePlanningById(@PathVariable String id) {
		return id;
	}
}