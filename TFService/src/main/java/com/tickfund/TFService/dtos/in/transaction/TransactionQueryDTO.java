package com.tickfund.TFService.dtos.in.transaction;

import com.tickfund.TFService.dtos.in.query.AbstractQueryDTO;
import com.tickfund.TFService.dtos.in.query.QueryOrder;
import com.tickfund.TFService.entities.tickfund.TransactionEntity;
import com.tickfund.TFService.utils.AnnotationHelper;
import org.springframework.stereotype.Service;

import javax.validation.constraints.AssertTrue;

@Service
public class TransactionQueryDTO extends AbstractQueryDTO {
    @AssertTrue(message = "Some of field in filters is not valid in transaction")
    @Override
    public boolean isFilterFieldValid(){
        return filters
                .stream()
                .allMatch(f ->
                        AnnotationHelper
                                .getFieldByAlias(TransactionEntity.class.getDeclaredFields(), f.getField()) != null);
    }

    @Override
    @AssertTrue(message = "Field in order is not valid in transaction")
    public boolean isOrderFieldValid() {
        return AnnotationHelper
                .getFieldByAlias(TransactionEntity.class.getDeclaredFields(), order.getField()) != null;
    }

    @Override
    public QueryOrder defaultOrder() {
        return new QueryOrder("history", "DESC");
    }
}
