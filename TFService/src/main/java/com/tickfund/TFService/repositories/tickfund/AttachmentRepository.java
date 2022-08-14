package com.tickfund.TFService.repositories.tickfund;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.tickfund.TFService.entities.tickfund.AttachmentEntity;
import com.tickfund.TFService.entities.tickfund.TransactionEntity;

import java.util.List;

public interface AttachmentRepository extends CrudRepository<AttachmentEntity, String> {
    @Modifying
    @Query("UPDATE AttachmentEntity a SET a.transactionEntity = :transactionEntity WHERE a.ID IN :attachmentIds")
    void updateTransactionId(@Param("attachmentIds") List<String> attachmentIDs, @Param("transaction") TransactionEntity transactionEntity);
}
