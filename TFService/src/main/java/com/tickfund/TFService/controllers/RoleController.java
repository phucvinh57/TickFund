package com.tickfund.TFService.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tickfund.TFService.services.RoleService;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired 
    private RoleService roleService;

    @GetMapping("")
    @ResponseBody
    public Object getPermissionOfRoles() {
        return roleService.getPermissionOfRoles();
    }

    @GetMapping("/mapping")
    @ResponseBody
    public Object getResourceActionMapping() {
        return roleService.getResourceActionMapping();
    }
}
