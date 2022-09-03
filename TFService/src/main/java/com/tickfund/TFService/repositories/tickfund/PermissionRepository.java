package com.tickfund.TFService.repositories.tickfund;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.tickfund.TFService.entities.composite_ids.PermissionEntityId;
import com.tickfund.TFService.entities.tickfund.PermissionEntity;

public interface PermissionRepository extends CrudRepository<PermissionEntity, PermissionEntityId>{
    List<PermissionEntity> findByRoleId(Integer roleId);
}
