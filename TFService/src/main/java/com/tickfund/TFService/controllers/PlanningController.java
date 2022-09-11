package com.tickfund.TFService.controllers;

import com.tickfund.TFService.dtos.in.planning.PlanningDto;
import com.tickfund.TFService.dtos.in.planning.PlanningQueryDTO;
import com.tickfund.TFService.dtos.out.PlanningOut;
import com.tickfund.TFService.dtos.out.QueryResultOut;
import com.tickfund.TFService.entities.tickfund.PlanningEntity;
import com.tickfund.TFService.exceptions.ResourceNotFoundException;
import com.tickfund.TFService.services.PlanningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/plannings")
public class PlanningController {
	@Autowired
	private PlanningService service;

	@GetMapping("/{id}")
	@ResponseBody
	public PlanningOut getPlanningById(@PathVariable(name = "id") String planningId) throws ResourceNotFoundException {
		Optional<PlanningEntity> result = this.service.getPlanningById(planningId);
		if(result.isPresent()){
			return new PlanningOut(result.get());
		}
		else {
			throw new ResourceNotFoundException("Planning ID %s is not exist".formatted(planningId));
		}
	}

	@PutMapping("/{id}")
	@ResponseBody
	public PlanningOut updatePlanningById(
			@PathVariable(name = "id") String ID,
			@Valid @RequestBody PlanningDto planningDto) {

		return new PlanningOut(this.service.updateById(ID, planningDto));
	}

	@PostMapping("")
	@ResponseBody
	public Map<String, Object> createPlanning(
		@Valid @RequestBody PlanningDto newPlanning
	) {
		String planningId = this.service.create(newPlanning);

		Map<String, Object> response = new HashMap<>();
		response.put("message", "Create planning successfully");
		response.put("id", planningId);
		return response;
	}
	@DeleteMapping("/{id}")
	@ResponseBody
	public Map<String, Object> deletePlanningById(@PathVariable(name = "id") String ID) {
		this.service.deleteById(ID);

		Map<String, Object> response = new HashMap<>();
		response.put("message", "Delete planning successfully");
		response.put("id", ID);
		return response;
	}

	@GetMapping("/query")
	@ResponseBody
	public QueryResultOut<PlanningOut> getPlanningByQuery(@Valid @RequestBody PlanningQueryDTO dto) {
		Long total = this.service.countPlanningByQuery(dto);
		List<PlanningOut> results = this
			.service
			.getPlanningByQuery(dto)
			.stream()
			.map(PlanningOut::new)
			.collect(Collectors.toList());

		QueryResultOut<PlanningOut> queryResultOut = new QueryResultOut<>();
		queryResultOut.setTotal(total);
		queryResultOut.setResults(results);
		return queryResultOut;
	}
}