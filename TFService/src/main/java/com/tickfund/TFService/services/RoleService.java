package com.tickfund.TFService.services;

import java.util.ArrayList;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tickfund.TFService.commons.vos.RoleVo;
import com.tickfund.TFService.dtos.in.user.UpdatePermissionDto;
import com.tickfund.TFService.dtos.in.user.UpdateRoleNameDto;
import com.tickfund.TFService.dtos.out.roles.ResourceActionMappingDto;
import com.tickfund.TFService.dtos.out.roles.RolesWithPermissionDto;
import com.tickfund.TFService.entities.tickfund.PermissionEntity;
import com.tickfund.TFService.entities.tickfund.ResourceActionMappingEntity;
import com.tickfund.TFService.entities.tickfund.RoleEntity;
import com.tickfund.TFService.exceptions.InvalidPermission;
import com.tickfund.TFService.repositories.tickfund.PermissionRepository;
import com.tickfund.TFService.repositories.tickfund.ResourceActionMappingRepository;
import com.tickfund.TFService.repositories.tickfund.RoleRepository;

@Service
public class RoleService {
    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private ResourceActionMappingRepository ramRepository;

    @Autowired
    private RoleRepository roleRepository;

    public Object getRoles() {
        return roleRepository.findAll();
    }

    public Object createRole(String roleName) {
        RoleEntity newRole = new RoleEntity();
        newRole.name = roleName;
        this.roleRepository.save(newRole);
        return new RoleVo(newRole.ID, newRole.name);
    }

    public Object getResourceActionMapping() {
        Iterable<ResourceActionMappingEntity> queryResult = ramRepository.findAll();
        ArrayList<ResourceActionMappingEntity> mappings = new ArrayList<>();
        queryResult.forEach(mappings::add);

        ResourceActionMappingDto dto = new ResourceActionMappingDto(mappings);
        return dto;
    }

    @SuppressWarnings({ "unchecked" })
    public RolesWithPermissionDto getPermissionOfRoles() {

        ArrayList<PermissionEntity> permissions = permissionRepository.findAllByOrderByRoleIdAsc();
        ArrayList<ArrayList<PermissionEntity>> fragmentList = new ArrayList<>();

        Integer roleIdTemp = null;
        ArrayList<PermissionEntity> fragmentItemTemp = new ArrayList<>();
        for (PermissionEntity permission : permissions) {
            if (permission.role.ID != roleIdTemp && roleIdTemp != null) {

                ArrayList<PermissionEntity> fragment = ArrayList.class.cast(fragmentItemTemp.clone());
                fragmentList.add(fragment);
                fragmentItemTemp.clear();
            }
            roleIdTemp = permission.role.ID;
            fragmentItemTemp.add(permission);
        }
        fragmentList.add(fragmentItemTemp);

        RolesWithPermissionDto rolesWithPermissionDto = new RolesWithPermissionDto(fragmentList);
        Iterable<RoleEntity> allRoles = this.roleRepository.findAll();
        for (RoleEntity role : allRoles) {
            boolean isExist = false;
            for (RoleVo item : rolesWithPermissionDto.getPermissions()) {
                if (role.ID == item.ID) {
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                rolesWithPermissionDto.add(new RoleVo(role.ID, role.name));
            }
        }

        return rolesWithPermissionDto;
    }

    public Object updateRoleName(UpdateRoleNameDto dto) {
        Optional<RoleEntity> qResult = roleRepository.findById(dto.roleId);
        if (qResult.isEmpty())
            return null;

        RoleEntity role = qResult.get();
        role.name = dto.roleName;
        roleRepository.save(role);
        return role;
    }

    @Transactional(rollbackOn = InvalidPermission.class)
    public void updatePermissions(UpdatePermissionDto dto) throws InvalidPermission {
        Iterable<ResourceActionMappingEntity> queryResult = ramRepository.findAll();
        ArrayList<ResourceActionMappingEntity> mappings = new ArrayList<>();
        queryResult.forEach(mappings::add);

        for (int i = 0; i < dto.mappings.size(); i++) {
            boolean validPermission = false;
            for (ResourceActionMappingEntity ramEntity : mappings) {
                if (dto.mappings.get(i).actionId == ramEntity.action.ID
                        && dto.mappings.get(i).resourceId == ramEntity.resource.ID) {
                    validPermission = true;
                }
            }
            if (!validPermission) {
                throw new InvalidPermission();
            }
        }

        permissionRepository.deleteByRoleId(dto.roleId);

        for (int i = 0; i < dto.mappings.size(); i++) {
            permissionRepository.insertPermission(
                    dto.roleId,
                    dto.mappings.get(i).resourceId,
                    dto.mappings.get(i).actionId);
        }
    }

    public Integer deleteById(Integer roleId) throws Exception {
        try {
            this.roleRepository.deleteById(roleId);
            return roleId;
        } catch (Exception e) {
           throw new Exception("SQL constraint");
        }
    }
}
