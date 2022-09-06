package com.tickfund.TFService.controllers;

import java.util.ArrayList;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tickfund.TFService.dtos.in.user.ChangeDepartmentDto;
import com.tickfund.TFService.dtos.in.user.ChangeRoleDto;
import com.tickfund.TFService.dtos.in.user.CreateUserDto;
import com.tickfund.TFService.dtos.in.user.ToggleUserActivationDto;
import com.tickfund.TFService.dtos.in.user.UpdateUserDto;
import com.tickfund.TFService.dtos.out.users.UserDto;
import com.tickfund.TFService.services.PersonalService;
import com.tickfund.TFService.services.UserService;

@RestController
@CrossOrigin({ "http://localhost:3000" })
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PersonalService personalService;

    @GetMapping("")
    @ResponseBody
    public ArrayList<UserDto> getAllUsers() throws Exception {
        return userService.getAllUserInfo();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Object getUserById(@PathVariable(name = "id") String userId) {
        return personalService.getInfoWithRole(userId);
    }

    @PutMapping("/role")
    @ResponseBody
    public String changeUserRole(@Valid @RequestBody ChangeRoleDto dto) {
        this.userService.changeRole(dto.userId, dto.roleId);
        return dto.userId;
    }

    @PutMapping("/department")
    @ResponseBody
    public String changeUserDepartment(
            @Valid @RequestBody ChangeDepartmentDto dto) {
        this.userService.changeDepartment(dto.userId, dto.departmentId);
        return dto.userId;
    }

    @PutMapping("/active")
    @ResponseBody
    public String toggleUserActivation(
            @Valid @RequestBody ToggleUserActivationDto dto) {
        this.userService.toggleActivation(dto.userId, dto.active);
        return dto.userId;
    }

    @PostMapping("")
    @ResponseBody
    public String createUser(@Valid @RequestBody CreateUserDto dto) {
        return this.userService.createUser(dto);
    }

    @PutMapping("")
    @ResponseBody
    public String updateUser(@Valid @RequestBody UpdateUserDto dto) throws Exception {
        return this.userService.updateUser(dto);
    }
}
