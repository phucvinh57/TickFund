package com.example.TFService.modules.planning.dto;

import com.example.TFService.enums.RepetitionModeEnum;
import com.example.TFService.modules.planning.dto.out.PlanningCycle;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.example.TFService.interfaces.IBuilder;

/*
 * RepetitionModeEnum mode;
 * PlanningCycle cycle;
 * Integer countdown;
 */
public class PlanningRepetitionDTO {
    @JsonProperty
    public RepetitionModeEnum mode;

    @JsonProperty
    public PlanningCycle cycle;

    @JsonProperty
    public Integer countdown;

    public static class Builder implements IBuilder<PlanningRepetitionDTO> {
        private PlanningRepetitionDTO dto = new PlanningRepetitionDTO();

        @Override
        public PlanningRepetitionDTO getResult() {
            // Must check requirement here
            return this.dto;
        }

        public Builder setMode(RepetitionModeEnum mode) {
            this.dto.mode = mode;
            return this;
        }

        public Builder setCycle(PlanningCycle cycle) {
            this.dto.cycle = cycle;
            return this;
        }

        public Builder setCountdown(Integer countdown) {
            this.dto.countdown = countdown;
            return this;
        }
    }
}
