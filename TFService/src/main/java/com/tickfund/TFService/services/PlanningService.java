package com.tickfund.TFService.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tickfund.TFService.dtos.in.NewPlanningDto;
import com.tickfund.TFService.dtos.out.ExtraPlanningDto;
import com.tickfund.TFService.entities.PlanningEntity;
import com.tickfund.TFService.repository.PlanningRepository;

@Service
public class PlanningService {
    @Autowired
    private PlanningRepository repository;

    public void deleteById(String ID) {
        this.repository.deleteById(ID);
    }

    public ExtraPlanningDto getExtraPlanningDataById(String ID) {
        ArrayList<ArrayList<Object>> data = this.repository.getExtraPlanningDataById(ID);
        if(data.size() == 0) {
            return null;
        }
        return new ExtraPlanningDto(data.get(0));
    }

    public String create(NewPlanningDto dto) {
        PlanningEntity entity = new PlanningEntity(dto);
        this.repository.save(entity);
        return entity.ID;
    }
}
