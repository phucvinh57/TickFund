package com.tickfund.TFService.services;

import com.tickfund.TFService.entities.tickfund.CategoryEntity;
import com.tickfund.TFService.entities.tickfund.PlanningEntity;
import com.tickfund.TFService.entities.tickfund.TransactionEntity;
import com.tickfund.TFService.dtos.in.transaction.TransactionQueryDTO;
import com.tickfund.TFService.repositories.tickfund.CategoryRepository;
import com.tickfund.TFService.repositories.tickfund.PlanningRepository;
import com.tickfund.TFService.repositories.tickfund.TransactionRepository;
import com.tickfund.TFService.utils.UniqueId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class TransactionService {
    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    PlanningRepository planningRepository;

    @Autowired
    AttachmentService attachmentService;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    ComplexQueryService<TransactionEntity> complexQueryService;

    public Optional<TransactionEntity> getTransactionById(String ID) {
        return this.transactionRepository.findById(ID);
    }

    @Transactional(rollbackOn = { Exception.class, Throwable.class })
    public String createTransaction(TransactionEntity transactionEntity, Set<String> attachmentsIds, String planningId) {
        transactionEntity.setID(UniqueId.generate(transactionEntity.getUserId()));
        CategoryEntity categoryEntity = categoryRepository.findById(transactionEntity.getCategoryName()).get();
        transactionEntity.setCategoryType(categoryEntity.type);

        for (String attachId : attachmentsIds) {
            transactionEntity.getAttachments().add(attachmentService.createAttachment(attachId, transactionEntity));
        }

        this.transactionRepository.save(transactionEntity);

        if(planningId != null){
            PlanningEntity resolvePlanning = this.planningRepository.findById(planningId).orElse(null);
            if(resolvePlanning != null){
                Integer countdown = resolvePlanning.getCountdown();
                if (countdown == 0){
                    throw new RuntimeException("Countdown of planning cannot be zero");
                }
                ChronoUnit chronoUnit = switch (resolvePlanning.getCycleUnit()) {
                    case WEEK -> ChronoUnit.WEEKS;
                    case MONTH -> ChronoUnit.MONTHS;
                    case YEAR -> ChronoUnit.YEARS;
                    default -> ChronoUnit.DAYS;
                };
                LocalDate temp = resolvePlanning.getStartDate();
                while(temp.isBefore(resolvePlanning.getNextDueDate())){
                    temp = temp.plus(1, chronoUnit);
                }
                resolvePlanning.setNextDueDate(temp.plus(1, chronoUnit));

                if(countdown != -1){
                    resolvePlanning.setCountdown(countdown - 1);
                }
                this.planningRepository.save(resolvePlanning);

            }
            else {

            }
        }
        return transactionEntity.getID();
    }

    @Transactional
    public Long countTransactionByQuery(TransactionQueryDTO queryDTO){

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        Root<TransactionEntity> transactionRoot = countQuery.from(TransactionEntity.class);

        return complexQueryService.countEntityByQuery(transactionRoot, countQuery, queryDTO, TransactionEntity.class);
    }

    @Transactional
    public List<TransactionEntity> getTransactionByQuery(TransactionQueryDTO queryDTO) {

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<TransactionEntity> criteriaQuery = criteriaBuilder.createQuery(TransactionEntity.class);
        Root<TransactionEntity> transactionRoot = criteriaQuery.from(TransactionEntity.class);

        // Tell criteria query that fetch mode is LEFT JOIN
        transactionRoot.fetch("attachments", JoinType.LEFT);

        return complexQueryService.getEntityByQuery(transactionRoot, criteriaQuery, queryDTO, TransactionEntity.class);

        // List<Predicate> predicateList = new ArrayList<>();
        // List<TransactionQueryFilter> conditionDTOList = queryDTO.getFilters();
        //
        // for(TransactionQueryFilter conditionDTO : conditionDTOList){
        // predicateList.add(conditionDTO.toPredicate(criteriaBuilder,
        // transactionRoot));
        // }
        //
        // if(queryDTO.isMust()){
        // criteriaQuery.where(criteriaBuilder.and(predicateList.toArray(new
        // Predicate[0])));
        // }
        // else {
        // criteriaQuery.where(criteriaBuilder.or(predicateList.toArray(new
        // Predicate[0])));
        // }
        //
        // String orderField = queryDTO.getOrder().getField();
        //
        // String orderMapField =
        // AnnotationHelper.getFieldByAlias(TransactionEntity.class.getDeclaredFields(),
        // orderField);
        // if(queryDTO.getOrder().isAsc()){
        // criteriaQuery.orderBy(criteriaBuilder.asc(transactionRoot.get(orderMapField)));
        // }
        // else {
        // criteriaQuery.orderBy(criteriaBuilder.desc(transactionRoot.get(orderMapField)));
        // }
        //
        // TypedQuery<TransactionEntity> transactionQuery =
        // entityManager.createQuery(criteriaQuery);
        //
        // Integer pageSize = queryDTO.getSize().getPageSize();
        // Integer pageNumber = queryDTO.getSize().getPageNumber();
        //
        // return transactionQuery
        // .setMaxResults(pageSize)
        // .setFirstResult((pageNumber - 1) * pageSize)
        // .getResultList();
    }
}
