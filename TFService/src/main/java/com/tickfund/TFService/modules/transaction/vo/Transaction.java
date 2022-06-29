package com.tickfund.TFService.modules.transaction.vo;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.base.BaseEntity;
import com.tickfund.TFService.exceptions.TransactionExcept;
import com.tickfund.TFService.modules.category.vo.CategoryVO;

public class Transaction extends BaseEntity<String> {
    @JsonProperty
    String userId;

    @JsonProperty
    String note;

    @JsonProperty
    ArrayList<String> attachmentsPath = new ArrayList<>();

    @JsonProperty
    CategoryVO categoryVO;

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

        public Builder setCategory(CategoryVO categoryVO){
            transactionVO.categoryVO = categoryVO;
            return this;
        }

        private void checkValid() throws TransactionExcept.MissingField {
            if(transactionVO.userId == null) {
                throw new TransactionExcept.MissingField("userId");
            }
            else if(transactionVO.note == null){
                throw new TransactionExcept.MissingField("note");
            }
            else if(transactionVO.categoryVO == null){
                throw new TransactionExcept.MissingField("category");
            }
        }
    }
}
