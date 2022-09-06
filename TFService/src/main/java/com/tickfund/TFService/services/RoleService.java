package com.tickfund.TFService.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tickfund.TFService.dtos.out.roles.ResourceActionMappingDto;
import com.tickfund.TFService.dtos.out.roles.RolesWithPermissionDto;
import com.tickfund.TFService.entities.tickfund.PermissionEntity;
import com.tickfund.TFService.entities.tickfund.ResourceActionMappingEntity;
import com.tickfund.TFService.repositories.tickfund.PermissionRepository;
import com.tickfund.TFService.repositories.tickfund.ResourceActionMappingRepository;

@Service
public class RoleService {
    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private ResourceActionMappingRepository ramRepository;

    public Object getResourceActionMapping() {
        Iterable<ResourceActionMappingEntity> queryResult = ramRepository.findAll();
        ArrayList<ResourceActionMappingEntity> mappings = new ArrayList<>();
        queryResult.forEach(mappings::add);

        ResourceActionMappingDto dto = new ResourceActionMappingDto(mappings);
        return dto;
    }

    @SuppressWarnings("uncheck")
    public Object getPermissionOfRoles() {
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
}
