package com.example.TFService.modules.transaction.repo;

import com.example.TFService.modules.common.CategoryVO;
import com.example.TFService.modules.common.IRepository;
import com.example.TFService.modules.transaction.TransactionExcept;
import com.example.TFService.modules.transaction.vo.TransactionVO;

import java.util.ArrayList;
import java.util.List;

public class TransactionRepo implements IRepository<TransactionVO, String> {

    @Override
    public TransactionVO getById(String Id) {
        TransactionVO.Builder builder = new TransactionVO.Builder();
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
    public List<TransactionVO> getAll(Integer offset, Integer size) {
        return new ArrayList<>();
    }
}
