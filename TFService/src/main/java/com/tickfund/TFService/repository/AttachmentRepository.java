package com.tickfund.TFService.repository;

import com.tickfund.TFService.entities.AttachmentEntity;
import com.tickfund.TFService.entities.TransactionEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttachmentRepository extends CrudRepository<AttachmentEntity, String> {
    @Modifying
    @Query("UPDATE AttachmentEntity a SET a.transactionEntity = :transactionEntity WHERE a.ID IN :attachmentIds")
    void updateTransactionId(@Param("attachmentIds") List<String> attachmentIDs, @Param("transaction") TransactionEntity transactionEntity);
}
