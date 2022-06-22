package com.example.TFService.modules.planning.entity;

import com.example.TFService.interfaces.IBuilder;
import com.example.TFService.modules.planning.vo.PlanningRepetitionVO;

public class Planning {
    public String planningID;
    public String userID;
    public Boolean isRepeat;
    public PlanningRepetitionVO repeat;

    public static class Builder implements IBuilder<Planning> {
        private Planning dto = new Planning();

        @Override
        public Planning build() {
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

        public Builder setPlanningRepetitionDTO(PlanningRepetitionVO repeat) {
            this.dto.repeat = repeat;
            return this;
        }
    }
}
