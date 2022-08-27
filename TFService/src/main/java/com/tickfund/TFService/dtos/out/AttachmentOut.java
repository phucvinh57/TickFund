package com.tickfund.TFService.dtos.out;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AttachmentOut {
    @JsonProperty
    String ID;
    @JsonProperty
    String path;

    @JsonProperty
    String name;


    public void setID(String ID) {
        this.ID = ID;
    }
    public void setPath(String path) {
        this.path = path;
    }

    public void setName(String name) {
        this.name = name;
    }

}
