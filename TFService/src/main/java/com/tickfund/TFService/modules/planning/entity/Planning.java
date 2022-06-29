package com.tickfund.TFService.modules.planning.entity;

import com.tickfund.TFService.interfaces.IBuilder;
import com.tickfund.TFService.modules.planning.vo.PlanningRepetitionVO;

// @Entity
// @Table(schema = "tickfund")
public class Planning {
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String ID;

    private String userID;
    private Boolean isRepeat;
    private PlanningRepetitionVO repeat;

    public String getID() {
        return this.ID;
    }

    public String getUserID() {
        return this.userID;
    }

    public Boolean getIsRepeat() {
        return this.isRepeat;
    }

    public PlanningRepetitionVO getRepeat() {
        return this.repeat;
    }

    public static class Builder implements IBuilder<Planning> {
        private Planning dto = new Planning();

        @Override
        public Planning build() {
            // Must check requirement here
            return this.dto;
        }

        public Builder setID(String ID) {
            this.dto.ID = ID;
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
