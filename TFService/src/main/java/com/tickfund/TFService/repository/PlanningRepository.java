package com.tickfund.TFService.repository;

import org.springframework.data.repository.CrudRepository;

import com.tickfund.TFService.entities.PlanningEntity;

public interface PlanningRepository extends CrudRepository<PlanningEntity, Integer> {

}
// import javax.persistence.EntityManager;
// import javax.persistence.criteria.CriteriaBuilder;
// import javax.persistence.criteria.CriteriaQuery;
// import javax.persistence.criteria.Root;

// import org.springframework.stereotype.Repository;

// @Repository
// public class PlanningRepository {
//     private EntityManager entityManager;


//     public Object create(Object data) {
//         return data;
//     }
// } 

