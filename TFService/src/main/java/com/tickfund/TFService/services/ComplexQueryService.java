package com.tickfund.TFService.services;

import com.tickfund.TFService.dtos.in.query.AbstractQueryDTO;
import com.tickfund.TFService.dtos.in.query.AbstractQueryFilter;
import com.tickfund.TFService.entities.tickfund.TransactionEntity;
import com.tickfund.TFService.utils.AnnotationHelper;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class ComplexQueryService<T> {
    @PersistenceContext
    EntityManager entityManager;

    public List<T> getEntityByQuery(Root<T> root, CriteriaQuery<T> criteriaQuery, AbstractQueryDTO queryDTO, Class<?> clazz){
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

//        List<Predicate> predicateList = new ArrayList<>();
//        List<AbstractQueryFilter> conditionDTOList = queryDTO.getFilters();
//
//        for(AbstractQueryFilter conditionDTO : conditionDTOList){
//            predicateList.add(conditionDTO.toPredicate(criteriaBuilder, root, clazz));
//        }
//
//        if(queryDTO.isMust()){
//            criteriaQuery.where(criteriaBuilder.and(predicateList.toArray(new Predicate[0])));
//        }
//        else {
//            criteriaQuery.where(criteriaBuilder.or(predicateList.toArray(new Predicate[0])));
//        }

        this.buildCriteriaQuery(root, criteriaQuery, queryDTO, clazz);

        String orderField = queryDTO.getOrder().getField();

        String orderMapField = AnnotationHelper.getFieldByAlias(TransactionEntity.class.getDeclaredFields(), orderField);
        if(queryDTO.getOrder().isAsc()){
            criteriaQuery.orderBy(criteriaBuilder.asc(root.get(orderMapField)));
        }
        else {
            criteriaQuery.orderBy(criteriaBuilder.desc(root.get(orderMapField)));
        }

        TypedQuery<T> query = entityManager.createQuery(criteriaQuery);

        Integer pageSize = queryDTO.getSize().getPageSize();
        Integer pageNumber = queryDTO.getSize().getPageNumber();

        return query
                .setMaxResults(pageSize)
                .setFirstResult((pageNumber - 1) * pageSize)
                .getResultList();
    }

    public Long countEntityByQuery(Root<T> root, CriteriaQuery<Long> criteriaQuery, AbstractQueryDTO queryDTO, Class<?> clazz){
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        this.buildCriteriaQuery(root, criteriaQuery, queryDTO, clazz);
        criteriaQuery.select(criteriaBuilder.count(root));
        return entityManager.createQuery(criteriaQuery).getSingleResult();
    }

    public void buildCriteriaQuery(Root<T> root, CriteriaQuery<?> criteriaQuery, AbstractQueryDTO queryDTO, Class<?> clazz){
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        List<Predicate> predicateList = new ArrayList<>();
        List<AbstractQueryFilter> conditionDTOList = queryDTO.getFilters();

        for(AbstractQueryFilter conditionDTO : conditionDTOList){
            predicateList.add(conditionDTO.toPredicate(criteriaBuilder, root, clazz));
        }

        if(queryDTO.isMust()){
            criteriaQuery.where(criteriaBuilder.and(predicateList.toArray(new Predicate[0])));
        }
        else {
            criteriaQuery.where(criteriaBuilder.or(predicateList.toArray(new Predicate[0])));
        }
    }
}
