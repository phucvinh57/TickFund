package com.tickfund.TFService.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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

}
