package com.example.TFService.modules.common;

import java.util.List;

public interface IRepository<TE, T> {
    TE getById(T Id);
    List<TE> getAll(Integer offset, Integer size);
}
