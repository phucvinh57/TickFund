package com.tickfund.TFService.services;

import java.util.*;

import com.tickfund.TFService.dtos.in.StatDTO;
import com.tickfund.TFService.dtos.in.transaction.TransactionQueryFilter;
import com.tickfund.TFService.dtos.in.transaction.TransactionQueryDTO;
import com.tickfund.TFService.entities.CategoryEntity;
import com.tickfund.TFService.entities.TransactionEntity;
import com.tickfund.TFService.modules.UniqueId;
import com.tickfund.TFService.repository.CategoryRepository;
import com.tickfund.TFService.utils.AnnotationHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tickfund.TFService.repository.TransactionRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

@Service
public class TransactionService {
    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    AttachmentService attachmentService;

    @PersistenceContext
    EntityManager entityManager;

    public Optional<TransactionEntity> getTransactionById(String ID) {
        return this.transactionRepository.findById(ID);
    }

    @Transactional(rollbackOn = {Exception.class, Throwable.class})
    public String createTransaction(TransactionEntity transactionEntity, Set<String> attachmentsIds){
        transactionEntity.setID(UniqueId.generate(String.valueOf(transactionEntity.getUserId())));

        CategoryEntity categoryEntity = categoryRepository.findById(transactionEntity.getCategoryName()).get();
        transactionEntity.setCategoryType(categoryEntity.type);

        for(String attachId : attachmentsIds){
            transactionEntity.getAttachments().add(attachmentService.createAttachment(attachId, transactionEntity));
        }

        this.transactionRepository.save(transactionEntity);
        return transactionEntity.getID();
    }

    @Transactional
    public List<TransactionEntity> getTransactionByQuery(TransactionQueryDTO queryDTO){

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<TransactionEntity> criteriaQuery = criteriaBuilder.createQuery(TransactionEntity.class);
        Root<TransactionEntity> transactionRoot = criteriaQuery.from(TransactionEntity.class);

        List<Predicate> predicateList = new ArrayList<>();
        List<TransactionQueryFilter> conditionDTOList = queryDTO.getFilters();

        for(TransactionQueryFilter conditionDTO : conditionDTOList){
            predicateList.add(conditionDTO.toPredicate(criteriaBuilder, transactionRoot));
        }

        if(queryDTO.isMust()){
            criteriaQuery.where(criteriaBuilder.and(predicateList.toArray(new Predicate[0])));
        }
        else {
            criteriaQuery.where(criteriaBuilder.or(predicateList.toArray(new Predicate[0])));
        }

        String orderField = queryDTO.getOrder().getField();

        String orderMapField = AnnotationHelper.getFieldByAlias(TransactionEntity.class.getDeclaredFields(), orderField);
        if(queryDTO.getOrder().isAsc()){
            criteriaQuery.orderBy(criteriaBuilder.asc(transactionRoot.get(orderMapField)));
        }
        else {
            criteriaQuery.orderBy(criteriaBuilder.desc(transactionRoot.get(orderMapField)));

        }

        TypedQuery<TransactionEntity> transactionQuery = entityManager.createQuery(criteriaQuery);

        Integer pageSize = queryDTO.getSize().getPageSize();
        Integer pageNumber = queryDTO.getSize().getPageNumber();

        return transactionQuery
                .setMaxResults(pageSize)
                .setFirstResult((pageNumber - 1) * pageSize)
                .getResultList();
    }
}
