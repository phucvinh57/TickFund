package com.tickfund.TFService.modules.transaction.services;

import com.tickfund.TFService.modules.transaction.repo.TransactionRepo;
import com.tickfund.TFService.modules.transaction.vo.Transaction;

public class TransactionService {

    private TransactionRepo transactionRepo = new TransactionRepo();
    public Transaction getTransactionById(String id){
        return transactionRepo.getById(id);
    }
}
