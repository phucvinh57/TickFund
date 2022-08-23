package com.tickfund.TFService.services;

import com.tickfund.TFService.entities.UserEntity;
import com.tickfund.TFService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public boolean isExist(String userId){
        return this.repository.existsById(userId);
    }
    public UserEntity getUserById(String userId){
        return this.repository.findById(userId).orElse(null);
    }
}
