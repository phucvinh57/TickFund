package com.tickfund.TFService.modules.transaction.repo;

import java.util.ArrayList;
import java.util.List;

import com.tickfund.TFService.commons.enums.CategoryType;
import com.tickfund.TFService.exceptions.TransactionExcept;
import com.tickfund.TFService.interfaces.IRepository;
import com.tickfund.TFService.interfaces.IUIDGen;
import com.tickfund.TFService.modules.category.vo.CategoryVO;
import com.tickfund.TFService.modules.transaction.vo.Transaction;

public class TransactionRepo implements IRepository<Transaction, String>, IUIDGen<String> {

    @Override
    public Transaction getById(String Id) {
        Transaction.Builder builder = new Transaction.Builder();
        CategoryVO category = new CategoryVO("Tiền nhà", CategoryType.INCOME);
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
