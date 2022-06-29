package com.tickfund.TFService.modules.planning;

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

import com.tickfund.TFService.commons.enums.CycleEnum;
import com.tickfund.TFService.commons.enums.RepetitionModeEnum;
import com.tickfund.TFService.modules.planning.entity.Planning;
import com.tickfund.TFService.modules.planning.repository.UserRepository;
// import com.tickfund.TFService.modules.planning.repository.PlanningRepository;
import com.tickfund.TFService.modules.planning.vo.PlanningCycleVO;
import com.tickfund.TFService.modules.planning.vo.PlanningRepetitionVO;
import com.tickfund.TFService.modules.planning.vo.in.PlanningVO;

import java.util.ArrayList;

@RestController
@RequestMapping("/plannings")
public class PlanningController {
	// @Autowired
	// private PlanningRepository repo;
	@Autowired
	private UserRepository repo;

	@GetMapping("")
	@ResponseBody
	public ArrayList<String> getPlannings() {
		return new ArrayList<>();
	}

	@GetMapping("/{id}")
	@ResponseBody
	public Planning getPlanningById(@PathVariable String id) {
		PlanningRepetitionVO.Builder repeatBuilder = new PlanningRepetitionVO.Builder();
		PlanningRepetitionVO repeat = repeatBuilder.setCycle(
				new PlanningCycleVO(
						CycleEnum.DAY,
						"2022-07-05 15:30",
						false))
				.setMode(RepetitionModeEnum.COUNTDOWN)
				.setCountdown(15)
				.build();

		Planning.Builder dataBuilder = new Planning.Builder();

		Planning data = dataBuilder.setID(id)
				.setUserID("userID")
				.setIsRepeat(false)
				.setPlanningRepetitionDTO(repeat)
				.build();
		return data;
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
	public String createPlanningById(
	// @RequestBody PlanningVO data
	) {
		final String id = "1915940";
		PlanningRepetitionVO.Builder repeatBuilder = new PlanningRepetitionVO.Builder();
		PlanningRepetitionVO repeat = repeatBuilder.setCycle(
				new PlanningCycleVO(
						CycleEnum.DAY,
						"2022-07-05 15:30",
						false))
				.setMode(RepetitionModeEnum.COUNTDOWN)
				.setCountdown(15)
				.build();

		Planning.Builder dataBuilder = new Planning.Builder();

		Planning p = dataBuilder.setID(id)
				.setUserID("userID")
				.setIsRepeat(false)
				.setPlanningRepetitionDTO(repeat)
				.build();
		// this.repo.save(p);
		
		return p.getID();
	}

	@DeleteMapping("/{id}")
	public String deletePlanningById(@PathVariable String id) {
		return id;
	}
}