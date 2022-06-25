package com.example.TFService.modules.transaction.services;

import com.example.TFService.exceptions.TransactionMissingField;
import com.example.TFService.interfaces.IUIDGen;
import com.example.TFService.modules.transaction.repo.TransactionRepo;
import com.example.TFService.modules.transaction.entity.Transaction;

import java.util.UUID;

public class TransactionService implements IUIDGen<String> {

    private TransactionRepo transactionRepo = new TransactionRepo();
    public Transaction getTransactionById(String id){
        return transactionRepo.getById(id);
    }
    public Transaction addTransaction(Transaction transaction) throws TransactionMissingField {
        Transaction.Builder.checkValidTransaction(transaction);
        return transactionRepo.add(transaction);
    }
    public String genUID(){
        return UUID.randomUUID().toString();
    }
}
