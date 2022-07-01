package com.tickfund.TFService.modules.category.repo;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.tickfund.TFService.commons.enums.CategoryType;
import com.tickfund.TFService.interfaces.IRepository;
import com.tickfund.TFService.modules.category.vo.CategoryVO;

public class CategoryRepo implements IRepository<CategoryVO, String> {

    @Override
    public CategoryVO getById (String name) { // id of Category is the name itself
        return new CategoryVO(name, CategoryType.INCOME);
    }

    @Override
    public List<CategoryVO> getAll(Integer offset, Integer size) {
        return new ArrayList<CategoryVO>();
    }

}
