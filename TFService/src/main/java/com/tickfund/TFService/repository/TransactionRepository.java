package com.tickfund.TFService.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tickfund.TFService.entities.TransactionEntity;

@Repository
public interface TransactionRepository extends CrudRepository<TransactionEntity, String> {
    @Query(value = "SELECT transaction.note AS note,"
            + " attachment.url AS url"
            + " FROM transaction"
            + " LEFT JOIN attachment ON transaction.ID = attachment.transaction_id"
            + " WHERE transaction.ID = :ID", nativeQuery = true)
    public ArrayList<ArrayList<Object>> getDetailById(@Param("ID") String ID);
}
