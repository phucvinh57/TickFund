package com.tickfund.TFService.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tickfund.TFService.dtos.in.user.CreateUserDto;
import com.tickfund.TFService.dtos.in.user.UpdateUserDto;
import com.tickfund.TFService.dtos.out.users.TickfundUserWithRoleDto;
import com.tickfund.TFService.dtos.out.users.TicklabUserDto;
import com.tickfund.TFService.dtos.out.users.UserDto;
import com.tickfund.TFService.entities.tickfund.RoleEntity;
import com.tickfund.TFService.entities.tickfund.UserEntity;
import com.tickfund.TFService.entities.ticklab_users.DepartmentEntity;
import com.tickfund.TFService.entities.ticklab_users.TickLabUserEntity;
import com.tickfund.TFService.exceptions.InconsistenceUserDataException;
import com.tickfund.TFService.repositories.tickfund.RoleRepository;
import com.tickfund.TFService.repositories.tickfund.UserRepository;
import com.tickfund.TFService.repositories.ticklab_users.DepartmentRepository;
import com.tickfund.TFService.repositories.ticklab_users.TickLabUserRepository;
import com.tickfund.TFService.utils.RemoveAccents;

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
            final TickfundUserWithRoleDto tfUserWithRole = new TickfundUserWithRoleDto();
            tfUserWithRole.ID = userWithRole.getID();
            tfUserWithRole.role = userWithRole.getRole();
            allTickfundUsersWithRole.add(tfUserWithRole);
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

        String[] splitNames = RemoveAccents.normalize(dto.name)
                .toLowerCase().trim().split("\\s+");
        String username = splitNames[splitNames.length - 1] + ".";
        for (int i = 0; i < splitNames.length - 1; i++) {
            username  += splitNames[i].charAt(0);
        }
        System.out.println(username);

        this.ticklabUserRepository.createAccount(username, dto);
        this.userRepository.createUserWithRole(userId, roleId);
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

        user.setRole(this.roleRepository.findById(roleId).orElseThrow());

        this.ticklabUserRepository.save(ticklabUser);
        this.userRepository.save(user);

        return userId;
    }

    public UserEntity getUserById(String userId) {
        return this.userRepository.findById(userId).orElse(null);
    }

    public void changeRole(String userId, Integer roleId) {
        UserEntity user = this.getUserById(userId);
        RoleEntity role = this.roleRepository.findById(roleId).orElseThrow();
        user.setRole(role);
        this.userRepository.save(user);
    }

    public void changeDepartment(String userId, Integer departmentId) {
        TickLabUserEntity user = this.ticklabUserRepository.findById(userId).orElseThrow();
        DepartmentEntity deparment = this.departmentRepository.findById(departmentId).orElseThrow();
        user.department = deparment;
        this.ticklabUserRepository.save(user);
    }

    public void toggleActivation(String userId, Boolean active) {
        TickLabUserEntity user = this.ticklabUserRepository.findById(userId).orElseThrow();
        user.active = active;
        this.ticklabUserRepository.save(user);
    }
}
