package com.tickfund.TFService.services;

import com.tickfund.TFService.repositories.tickfund.UserRepository;
import com.tickfund.TFService.repositories.ticklab_users.TickLabUserRepository;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private TickLabUserRepository ticklabUserRepository;

    @Autowired
    private UserRepository userRepository;

    public boolean isExist(String userId) {
        return this.userRepository
                .existsById(userId);
    }

    public Object getAllUserInfo() {
        ArrayList<Object> list = new ArrayList<>();
        list.add(this.ticklabUserRepository.getAllUserInfo());
        list.add(this.userRepository.findAll());
        return list;
    }
}