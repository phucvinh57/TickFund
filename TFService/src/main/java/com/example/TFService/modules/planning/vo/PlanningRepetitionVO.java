package com.example.TFService.modules.planning.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.example.TFService.commons.enums.RepetitionModeEnum;
import com.example.TFService.interfaces.IBuilder;

/*
 * RepetitionModeEnum mode;
 * PlanningCycle cycle;
 * Integer countdown;
 */
public class PlanningRepetitionVO {
    @JsonProperty
    public RepetitionModeEnum mode;

    @JsonProperty
    public PlanningCycleVO cycle;

    @JsonProperty
    public Integer countdown;

    public static class Builder implements IBuilder<PlanningRepetitionVO> {
        private PlanningRepetitionVO dto = new PlanningRepetitionVO();

        @Override
        public PlanningRepetitionVO build() {
            // Must check requirement here
            return this.dto;
        }

        public Builder setMode(RepetitionModeEnum mode) {
            this.dto.mode = mode;
            return this;
        }

        public Builder setCycle(PlanningCycleVO cycle) {
            this.dto.cycle = cycle;
            return this;
        }

        public Builder setCountdown(Integer countdown) {
            this.dto.countdown = countdown;
            return this;
        }
    }
}
