package com.tickfund.TFService.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tickfund.TFService.dtos.in.user.CreateUserDto;
import com.tickfund.TFService.dtos.in.user.UpdateUserDto;
import com.tickfund.TFService.dtos.out.user.TickfundUserWithRoleDto;
import com.tickfund.TFService.dtos.out.user.TicklabUserDto;
import com.tickfund.TFService.dtos.out.user.UserDto;
import com.tickfund.TFService.entities.tickfund.UserEntity;
import com.tickfund.TFService.entities.ticklab_users.DepartmentEntity;
import com.tickfund.TFService.entities.ticklab_users.TickLabUserEntity;
import com.tickfund.TFService.exceptions.InconsistenceUserDataException;
import com.tickfund.TFService.repositories.tickfund.RoleRepository;
import com.tickfund.TFService.repositories.tickfund.UserRepository;
import com.tickfund.TFService.repositories.ticklab_users.DepartmentRepository;
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

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

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
        for (UserEntity userWithRole : this.userRepository.findAllByOrderByIDAsc()) {

            System.out.println("============");

            System.out.println(userWithRole.getID());
            System.out.println(userWithRole.getRoleEntity().ID);
            System.out.println(userWithRole.getRoleEntity().name);
            System.out.println("============");

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

    public String createUser(CreateUserDto dto) {
        String userId = dto.ID;
        Integer roleId = dto.roleId;
        this.ticklabUserRepository.createAccount(dto);
        this.userRepository.setRoleForUser(userId, roleId);
        return userId;
    }

    public String updateUser(UpdateUserDto dto) throws Exception {
        String userId = dto.ID;
        Integer roleId = dto.roleId;

        TickLabUserEntity ticklabUser = this.ticklabUserRepository.findById(userId).orElseThrow();
        UserEntity user = this.userRepository.findById(userId).orElseThrow();
        DepartmentEntity department = this.departmentRepository.findById(dto.departmentId).orElseThrow();

        System.out.println(ticklabUser.ID);
        ticklabUser.setBasicInfo(dto);
        ticklabUser.setDepartment(department);

        user.setRoleEntity(this.roleRepository.findById(roleId).orElseThrow());

        this.ticklabUserRepository.save(ticklabUser);
        this.userRepository.save(user);

        return userId;
    }
    public UserEntity getUserById(String userId){
        return this.userRepository.findById(userId).orElse(null);
    }
}
