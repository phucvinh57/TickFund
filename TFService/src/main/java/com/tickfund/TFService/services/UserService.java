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

    public ArrayList<Object> getAllUser() {
        ArrayList<Object> result = new ArrayList<>();
        this.ticklabUserRepository.findAll().forEach(result::add);
        return result;
    }
}
