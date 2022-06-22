package com.example.TFService.modules.transaction.vo;

import java.util.ArrayList;

import com.example.TFService.base.BaseEntity;
import com.example.TFService.modules.common.CategoryVO;
import com.example.TFService.modules.transaction.exception.TransactionExcept;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Transaction extends BaseEntity<String> {
    @JsonProperty
    String userId;

    @JsonProperty
    String note;

    @JsonProperty
    ArrayList<String> attachmentsPath = new ArrayList<>();

    @JsonProperty
    CategoryVO category;

    static public class Builder {
        Transaction transactionVO = new Transaction();
        public Transaction build() throws TransactionExcept.MissingField{
            this.checkValid();
            return this.transactionVO;
        }

        public Builder setUserId(String userId) {
            transactionVO.userId = userId;
            return this;
        }

        public Builder setNote(String note){
            transactionVO.note= note;
            return this;
        }

        public Builder setCategory(CategoryVO category){
            transactionVO.category = category;
            return this;
        }

        private void checkValid() throws TransactionExcept.MissingField {
            if(transactionVO.userId == null) {
                throw new TransactionExcept.MissingField("userId");
            }
            else if(transactionVO.note == null){
                throw new TransactionExcept.MissingField("note");
            }
            else if(transactionVO.category == null){
                throw new TransactionExcept.MissingField("category");
            }
        }
    }
}
