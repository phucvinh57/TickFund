package com.tickfund.TFService.services;

import java.util.ArrayList;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Object getResourceActionMapping() {
        Iterable<ResourceActionMappingEntity> queryResult = ramRepository.findAll();
        ArrayList<ResourceActionMappingEntity> mappings = new ArrayList<>();
        queryResult.forEach(mappings::add);

        ResourceActionMappingDto dto = new ResourceActionMappingDto(mappings);
        return dto;
    }

    public RolesWithPermissionDto getPermissionOfRoles() {
        ArrayList<PermissionEntity> permissions = permissionRepository.findAllByOrderByRoleIdAsc();
        ArrayList<ArrayList<PermissionEntity>> fragmentList = new ArrayList<>();

        Integer roleIdTemp = null;
        ArrayList<PermissionEntity> fragmentItemTemp = new ArrayList<>();
        for (int i = 0; i < permissions.size(); i++) {
            PermissionEntity currPermission = permissions.get(i);
            if (currPermission.role.ID != roleIdTemp && roleIdTemp != null) {
                ArrayList<PermissionEntity> fragment = ArrayList.class.cast(fragmentItemTemp.clone());
                fragmentList.add(fragment);
                fragmentItemTemp.clear();
            }
            roleIdTemp = currPermission.role.ID;
            fragmentItemTemp.add(currPermission);
        }
        fragmentList.add(fragmentItemTemp);
        return new RolesWithPermissionDto(fragmentList);
    }

    public Integer updateRoleName(UpdateRoleNameDto dto) {
        Optional<RoleEntity> qResult = roleRepository.findById(dto.roleId);
        if (qResult.isEmpty())
            return null;

        RoleEntity role = qResult.get();
        role.name = dto.roleName;
        roleRepository.save(role);
        return role.ID;
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
}
