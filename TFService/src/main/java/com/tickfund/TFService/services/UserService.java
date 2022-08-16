package com.tickfund.TFService.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tickfund.TFService.dtos.out.user.TickfundUserWithRoleDto;
import com.tickfund.TFService.dtos.out.user.TicklabUserDto;
import com.tickfund.TFService.dtos.out.user.UserDto;
import com.tickfund.TFService.exceptions.InconsistenceUserDataException;
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

    public ArrayList<UserDto> getAllUserInfo() throws Exception {
        final ObjectMapper objectMapper = new ObjectMapper();

        final ArrayList<TicklabUserDto> allAccountsInfo = new ArrayList<>();
        for (Object accountInfo : this.ticklabUserRepository.getAllAccountsInfo()) {
            allAccountsInfo.add(objectMapper.convertValue(
                    accountInfo,
                    TicklabUserDto.class));
        }

        final ArrayList<TickfundUserWithRoleDto> allTickfundUsersWithRole = new ArrayList<>();
        for (Object userWithRole : this.userRepository.findAllByOrderByIDAsc()) {
            allTickfundUsersWithRole.add(objectMapper.convertValue(
                    userWithRole,
                    TickfundUserWithRoleDto.class));
        }

        if (allAccountsInfo.size() != allTickfundUsersWithRole.size()) {
            throw new InconsistenceUserDataException("Inconsistence User Data");
        }

        final ArrayList<UserDto> allUsersInfo = new ArrayList<>();
        for (int i = 0; i < allAccountsInfo.size(); i++) {
            allUsersInfo.add(new UserDto(
                    allAccountsInfo.get(i),
                    allTickfundUsersWithRole.get(i)));
        }

        return allUsersInfo;
    }
}
