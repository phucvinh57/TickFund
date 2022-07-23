package com.tickfund.TFService.dtos.out;

import java.util.ArrayList;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.modules.ObjectCaster;

public class ExtraTransactionDto {
    private enum ParamName {
        NOTE, ATTACHMENT
    }

    @JsonProperty
    @NotNull
    public String note;

    @JsonProperty
    @NotNull
    public ArrayList<String> attachments;

    public ExtraTransactionDto(ArrayList<ArrayList<Object>> queryData) {
        this.note = ObjectCaster.toString(queryData.get(0).get(ParamName.NOTE.ordinal()));
        this.attachments = new ArrayList<>();

        for(ArrayList<Object> row: queryData) {
            this.attachments.add(ObjectCaster.toString(row.get(ParamName.ATTACHMENT.ordinal())));
        }
    }
}
