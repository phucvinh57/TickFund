package com.example.TFService.modules.planning.dto.out;

import com.example.TFService.interfaces.IBuilder;
import com.example.TFService.modules.planning.dto.PlanningRepetitionDTO;

public class PlanningDTO {
    public String planningID;
    public String userID;
    public Boolean isRepeat;
    public PlanningRepetitionDTO repeat;

    public static class Builder implements IBuilder<PlanningDTO> {
        private PlanningDTO dto = new PlanningDTO();

        @Override
        public PlanningDTO getResult() {
            // Must check requirement here
            return this.dto;
        }

        public Builder setPlanningID(String planningID) {
            this.dto.planningID = planningID;
            return this;
        }

        public Builder setUserID(String userID) {
            this.dto.userID = userID;
            return this;
        }

        public Builder setIsRepeat(Boolean isRepeat) {
            this.dto.isRepeat = isRepeat;
            return this;
        }

        public Builder setPlanningRepetitionDTO(PlanningRepetitionDTO repeat) {
            this.dto.repeat = repeat;
            return this;
        }
    }
}
