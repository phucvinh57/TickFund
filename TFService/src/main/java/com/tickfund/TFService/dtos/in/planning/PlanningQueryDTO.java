package com.tickfund.TFService.dtos.in.planning;

import com.tickfund.TFService.dtos.in.query.AbstractQueryDTO;
import com.tickfund.TFService.dtos.in.query.QueryOrder;
import com.tickfund.TFService.entities.tickfund.PlanningEntity;
import com.tickfund.TFService.entities.tickfund.TransactionEntity;
import com.tickfund.TFService.utils.AnnotationHelper;

import javax.validation.constraints.AssertTrue;

public class PlanningQueryDTO extends AbstractQueryDTO {
    @AssertTrue(message = "Some of field in filters is not valid in planning")
    @Override
    public boolean isFilterFieldValid(){
        return filters
                .stream()
                .allMatch(f ->
                        AnnotationHelper
                                .getFieldByAlias(PlanningEntity.class.getDeclaredFields(), f.getField()) != null);
    }

    @Override
    @AssertTrue(message = "Field in order is not valid in planning")
    public boolean isOrderFieldValid() {
        return AnnotationHelper
                .getFieldByAlias(PlanningEntity.class.getDeclaredFields(), order.getField()) != null;
    }

    @Override
    public QueryOrder defaultOrder() {
        return new QueryOrder("next_due_date", "DESC");
    }
}
