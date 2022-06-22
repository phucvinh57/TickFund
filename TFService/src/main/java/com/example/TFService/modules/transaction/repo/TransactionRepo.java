package com.example.TFService.modules.transaction.repo;

import com.example.TFService.interfaces.IUIDGen;
import com.example.TFService.modules.common.CategoryVO;
import com.example.TFService.interfaces.IRepository;
import com.example.TFService.modules.transaction.exception.TransactionExcept;
import com.example.TFService.modules.transaction.vo.Transaction;

import java.util.ArrayList;
import java.util.List;

public class TransactionRepo implements IRepository<Transaction, String>, IUIDGen<String> {

    @Override
    public Transaction getById(String Id) {
        Transaction.Builder builder = new Transaction.Builder();
        CategoryVO category = new CategoryVO("Tiền nhà", CategoryVO.CategoryType.INCOME);
        try {
            return builder
                    .setNote("Tiền nhà tháng này giảm")
                    .setUserId("1914424")
                    .setCategory(category)
                    .build();
        }
        catch (TransactionExcept.MissingField ex){
            return null;
        }
    }

    @Override
    public List<Transaction> getAll(Integer offset, Integer size) {
        return new ArrayList<>();
    }

    @Override
    public String genUID(){
        return "Nhancu";
    }
}
