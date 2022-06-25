package com.example.TFService.modules.transaction.repo;

import com.example.TFService.interfaces.IUIDGen;
import com.example.TFService.interfaces.IRepository;
import com.example.TFService.modules.transaction.entity.Transaction;
import com.example.TFService.modules.category.vo.CategoryVO;
import com.example.TFService.commons.enums.CategoryType;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class TransactionRepo implements IRepository<Transaction, String>{

    private ArrayList<Transaction> transactionArrayList = new ArrayList<>();

    @Override
    public Transaction getById(String id) {
        Transaction.Builder builder = new Transaction.Builder();
        CategoryVO category = new CategoryVO("Tiền nhà", CategoryType.INCOME);

        return transactionArrayList
                .stream()
                .filter(transaction -> transaction.getId().equals(id))
                .findAny()
                .orElse(null);
    }

    @Override
    public Transaction add(Transaction transaction){
        transactionArrayList.add(transaction);
        return transaction;
    }

    @Override
    public List<Transaction> getAll(Integer offset, Integer size) {
        return this.transactionArrayList;
    }
}
