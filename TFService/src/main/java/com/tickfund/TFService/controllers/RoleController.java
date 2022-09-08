package com.tickfund.TFService.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tickfund.TFService.dtos.in.user.UpdatePermissionDto;
import com.tickfund.TFService.dtos.in.user.UpdateRoleNameDto;
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

    @PutMapping("/name")
    @ResponseBody
    public Integer updateRoleName(@Valid @RequestBody UpdateRoleNameDto dto) {
        return roleService.updateRoleName(dto);
    }

    @PutMapping("/permission")
    @ResponseBody
    public Object updatePermissions(@Valid @RequestBody UpdatePermissionDto dto) {
        return null;
    }
}
