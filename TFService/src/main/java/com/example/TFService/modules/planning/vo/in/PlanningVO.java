package com.example.TFService.modules.planning.vo.in;

import com.example.TFService.interfaces.IBuilder;
import com.example.TFService.modules.category.vo.CategoryVO;
import com.example.TFService.modules.planning.vo.PlanningRepetitionVO;
import com.fasterxml.jackson.annotation.JsonProperty;


public class PlanningVO {
    @JsonProperty
    CategoryVO category;

    @JsonProperty
    Integer amount;

    @JsonProperty
    String userID;

    @JsonProperty
    Boolean isRepeat;

    @JsonProperty
    String startDate;

    @JsonProperty
    PlanningRepetitionVO repeat = null;

    public static class Builder implements IBuilder<PlanningVO> {
        private PlanningVO dto = new PlanningVO();

        @Override
        public PlanningVO build() {
            // Must check requirement here
            return this.dto;
        }

        public PlanningVO.Builder setCategory(CategoryVO c) {
            this.dto.category = c;
            return this;
        }

        public PlanningVO.Builder setAmount(Integer amount) {
            this.dto.amount = amount;
            return this;
        }

        public PlanningVO.Builder setUserID(String uid) {
            this.dto.userID = uid;
            return this;
        }

        public PlanningVO.Builder setIsRepeat(Boolean isRepeat) {
            this.dto.isRepeat = isRepeat;
            return this;
        }

        public PlanningVO.Builder setStartDate(String startDate) {
            this.dto.startDate = startDate;
            return this;
        }

        public PlanningVO.Builder setPlanningRepetitionDTO(PlanningRepetitionVO prDto) {
            this.dto.repeat = prDto;
            return this;
        }
    }
}
