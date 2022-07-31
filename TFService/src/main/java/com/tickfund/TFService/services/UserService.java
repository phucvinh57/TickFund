package com.tickfund.TFService.services;

import com.tickfund.TFService.repository.CategoryRepository;
import com.tickfund.TFService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public boolean isExist(Integer userId){
        return this.repository.existsById(String.valueOf(userId));
    }
}
