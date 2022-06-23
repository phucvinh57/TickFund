package com.example.TFService.modules.planning.vo.in;

import java.time.LocalDateTime;

import com.example.TFService.common.Category;
import com.example.TFService.interfaces.IBuilder;
import com.example.TFService.modules.planning.vo.PlanningRepetitionVO;
import com.fasterxml.jackson.annotation.JsonProperty;


public class PlanningUpdateVO {
    @JsonProperty
    Category category;

    @JsonProperty
    Integer amount;

    @JsonProperty
    String userID;

    @JsonProperty
    Boolean isRepeat;

    @JsonProperty
    LocalDateTime startDate;

    @JsonProperty
    PlanningRepetitionVO repeat = null;

    public static class Builder implements IBuilder<PlanningUpdateVO> {
        private PlanningUpdateVO dto = new PlanningUpdateVO();

        @Override
        public PlanningUpdateVO build() {
            // Must check requirement here
            return this.dto;
        }

        public PlanningUpdateVO.Builder setCategory(Category c) {
            this.dto.category = c;
            return this;
        }

        public PlanningUpdateVO.Builder setAmount(Integer amount) {
            this.dto.amount = amount;
            return this;
        }

        public PlanningUpdateVO.Builder setUserID(String uid) {
            this.dto.userID = uid;
            return this;
        }

        public PlanningUpdateVO.Builder setIsRepeat(Boolean isRepeat) {
            this.dto.isRepeat = isRepeat;
            return this;
        }

        public PlanningUpdateVO.Builder setStartDate(LocalDateTime startDate) {
            this.dto.startDate = startDate;
            return this;
        }

        public PlanningUpdateVO.Builder setPlanningRepetitionDTO(PlanningRepetitionVO prDto) {
            this.dto.repeat = prDto;
            return this;
        }
    }
}
