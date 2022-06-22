package com.example.TFService.modules.planning.dto.in;

import java.time.LocalDateTime;

import com.example.TFService.interfaces.IBuilder;
import com.example.TFService.modules.common.Category;
import com.example.TFService.modules.planning.dto.PlanningRepetitionDTO;
import com.fasterxml.jackson.annotation.JsonProperty;


public class PlanningUpdateDTO {
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
    PlanningRepetitionDTO repeat = null;

    public static class Builder implements IBuilder<PlanningUpdateDTO> {
        private PlanningUpdateDTO dto = new PlanningUpdateDTO();

        @Override
        public PlanningUpdateDTO getResult() {
            // Must check requirement here
            return this.dto;
        }

        public PlanningUpdateDTO setCategory(Category c) {
            this.dto.category = c;
            return this.dto;
        }

        public PlanningUpdateDTO setAmount(Integer amount) {
            this.dto.amount = amount;
            return this.dto;
        }

        public PlanningUpdateDTO setUserID(String uid) {
            this.dto.userID = uid;
            return this.dto;
        }

        public PlanningUpdateDTO setIsRepeat(Boolean isRepeat) {
            this.dto.isRepeat = isRepeat;
            return this.dto;
        }

        public PlanningUpdateDTO setStartDate(LocalDateTime startDate) {
            this.dto.startDate = startDate;
            return this.dto;
        }

        public PlanningUpdateDTO setPlanningRepetitionDTO(PlanningRepetitionDTO prDto) {
            this.dto.repeat = prDto;
            return this.dto;
        }
    }
}
