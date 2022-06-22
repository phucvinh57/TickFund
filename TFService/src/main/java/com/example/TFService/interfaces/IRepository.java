package com.example.TFService.interfaces;

import java.util.List;

// TE = Type of entity
// TID = Type of ID
public interface IRepository<TE, TID> {
    TE getById(TID Id);
    List<TE> getAll(Integer offset, Integer size);
}
