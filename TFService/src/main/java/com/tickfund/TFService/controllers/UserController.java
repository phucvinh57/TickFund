package com.tickfund.TFService.controllers;

import java.util.ArrayList;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tickfund.TFService.dtos.in.user.CreateUserDto;
import com.tickfund.TFService.dtos.in.user.UpdateUserDto;
import com.tickfund.TFService.dtos.out.user.UserDto;
import com.tickfund.TFService.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("")
    @ResponseBody
    public ArrayList<UserDto> getAllUsers() throws Exception {
        return userService.getAllUserInfo();
    }

    @PostMapping("")
    @ResponseBody
    public String createUser(@Valid @RequestBody CreateUserDto dto) {
        return this.userService.createUser(dto);
    }

    @PutMapping("")
    @ResponseBody
    public Object updateUser(@Valid @RequestBody UpdateUserDto dto) {
        return dto;
    }
}
