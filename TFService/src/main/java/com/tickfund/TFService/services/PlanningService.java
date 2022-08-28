package com.tickfund.TFService.services;

import com.tickfund.TFService.dtos.in.planning.PlanningDto;
import com.tickfund.TFService.dtos.in.planning.PlanningQueryDTO;
import com.tickfund.TFService.entities.tickfund.PlanningEntity;
import com.tickfund.TFService.entities.tickfund.UserEntity;
import com.tickfund.TFService.repositories.tickfund.CategoryRepository;
import com.tickfund.TFService.repositories.tickfund.PlanningRepository;
import com.tickfund.TFService.utils.UniqueId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.Optional;

@Service
public class PlanningService {
    @Autowired
    private PlanningRepository planningRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ComplexQueryService<PlanningEntity> complexQueryService;

    @PersistenceContext
    EntityManager entityManager;

    public void deleteById(String ID) {
        this.planningRepository.deleteById(ID);
    }

    public Optional<PlanningEntity> getPlanningById(String ID) {
        return this.planningRepository.findById(ID);
    }

    public String create(PlanningDto dto) {
        PlanningEntity planningEntity = new PlanningEntity(dto);
        UserEntity userEntity = new UserEntity();
        userEntity.setID(dto.userId);
        planningEntity.setUser(userEntity);
        planningEntity.setID(UniqueId.generate(dto.userId));
        planningEntity.setNextDueDate(planningEntity.getStartDate());

        this.planningRepository.save(planningEntity);
        return planningEntity.getID();
    }

    public PlanningEntity updateById(String ID, PlanningDto dto) {
        PlanningEntity planningEntity = new PlanningEntity(dto);
        planningEntity.setID(ID);
        UserEntity userEntity = new UserEntity();

        userEntity.setID(dto.userId);
        planningEntity.setUser(userEntity);
        planningEntity.setNextDueDate(planningEntity.getStartDate());

        this.planningRepository.save(planningEntity);

        return planningEntity;
    }

    public List<PlanningEntity> getPlanningByQuery(PlanningQueryDTO queryDTO){
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<PlanningEntity> criteriaQuery = criteriaBuilder.createQuery(PlanningEntity.class);
        Root<PlanningEntity> planningRoot = criteriaQuery.from(PlanningEntity.class);

        planningRoot.fetch("user", JoinType.LEFT);

        return complexQueryService.getEntityByQuery(planningRoot, criteriaQuery, queryDTO, PlanningEntity.class);
    }
}
