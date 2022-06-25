package com.example.TFService.modules.transaction.entity;

import java.util.ArrayList;

import com.example.TFService.base.BaseEntity;
import com.example.TFService.exceptions.TransactionMissingField;
import com.example.TFService.modules.category.vo.CategoryVO;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.util.BeanUtil;
import org.springframework.beans.BeanUtils;

public class Transaction extends BaseEntity<String> implements Cloneable {

    @JsonProperty
    String userId;

    @JsonProperty
    String note;

    @JsonProperty
    ArrayList<String> attachmentsPath = new ArrayList<>();

    @JsonProperty
    CategoryVO category;

    @JsonProperty
    Integer amount;

    @Override
    public Object clone() throws CloneNotSupportedException{
        return super.clone();
    }

    static public class Builder {
        Transaction transactionVO = new Transaction();
        public Transaction build() throws TransactionMissingField{
            this.checkValidTransaction(transactionVO);
            return this.transactionVO;
        }

        public Builder copyProperties(Transaction transaction){
            try {
                transactionVO = (Transaction) transaction.clone();
            }
            catch (CloneNotSupportedException ex){
                System.out.println("hoho");
            }
            System.out.println(transaction.userId);
            System.out.println(transactionVO.userId);
            return this;
        }

        public Builder setId(String id){
            transactionVO.id = id;
            return this;
        }

        public Builder setAmount(Integer amount){
            transactionVO.amount = amount;
            return this;
        }

        public Builder setUserId(String userId) {
            transactionVO.userId = userId;
            return this;
        }

        public Builder setNote(String note){
            transactionVO.note= note;
            return this;
        }

        public Builder setCategory(CategoryVO categoryVO){
            transactionVO.category = categoryVO;
            return this;
        }

        static public void checkValidTransaction(Transaction transaction) throws TransactionMissingField {
            if(transaction.getId() == null){
                throw new TransactionMissingField("id");
            }
            else if(transaction.amount == null){
                throw new TransactionMissingField("amount");
            }
            else if(transaction.userId == null) {
                throw new TransactionMissingField("userId");
            }
            else if(transaction.category == null){
                throw new TransactionMissingField("category");
            }
        }
    }
}
