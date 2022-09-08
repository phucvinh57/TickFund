package com.tickfund.TFService.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tickfund.TFService.dtos.out.PersonalDto;
import com.tickfund.TFService.entities.tickfund.PermissionEntity;
import com.tickfund.TFService.entities.tickfund.RoleEntity;
import com.tickfund.TFService.entities.tickfund.UserEntity;
import com.tickfund.TFService.entities.ticklab_users.TickLabUserEntity;
import com.tickfund.TFService.repositories.tickfund.PermissionRepository;
import com.tickfund.TFService.repositories.tickfund.UserRepository;
import com.tickfund.TFService.repositories.ticklab_users.TickLabUserRepository;

@Service
public class PersonalService {
    @Autowired
    private TickLabUserRepository tickLabUserRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Object getInfoWithRole(String userId) {
        TickLabUserEntity tlUserEntity = tickLabUserRepository.findById(userId).orElseThrow();
        UserEntity tfUserEntity = userRepository.findById(userId).orElseThrow();
        RoleEntity userRole = tfUserEntity.getRole();

        List<PermissionEntity> permissionEntities = permissionRepository.findByRoleId(userRole.ID);

        PersonalDto dto = new PersonalDto();
        dto.setInfo(tlUserEntity);
        if(permissionEntities.size() == 0) 
            dto.setRole(userRole);
        else dto.setRole(permissionEntities);
        return dto;
    }
}
