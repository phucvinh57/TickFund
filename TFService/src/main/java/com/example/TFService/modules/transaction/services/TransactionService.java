package com.example.TFService.modules.transaction.services;

import com.example.TFService.modules.transaction.repo.TransactionRepo;
import com.example.TFService.modules.transaction.vo.TransactionVO;

public class TransactionService {

    private TransactionRepo transactionRepo = new TransactionRepo();
    public TransactionVO getTransactionById(String id){
        return transactionRepo.getById(id);
    }
}
