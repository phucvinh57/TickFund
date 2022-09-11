package com.tickfund.TFService.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tickfund.TFService.dtos.in.role.CreateRoleDto;
import com.tickfund.TFService.dtos.in.user.UpdatePermissionDto;
import com.tickfund.TFService.dtos.in.user.UpdateRoleNameDto;
import com.tickfund.TFService.exceptions.InvalidPermission;
import com.tickfund.TFService.services.RoleService;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired 
    private RoleService roleService;

    @GetMapping("")
    @ResponseBody
    public Object getRoles() {
        return roleService.getRoles();
    }

    @PostMapping("")
    @ResponseBody 
    public Object createRole(@Valid @RequestBody CreateRoleDto dto) {
        return this.roleService.createRole(dto.roleName);
    }

    @GetMapping("/permissions")
    @ResponseBody
    public Object getPermissionOfRoles() {
        return roleService.getPermissionOfRoles();
    }

    @PutMapping("/permissions")
    @ResponseBody
    public Integer updatePermissions(@Valid @RequestBody UpdatePermissionDto dto) throws InvalidPermission {
        roleService.updatePermissions(dto);
        return dto.roleId;
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
}
