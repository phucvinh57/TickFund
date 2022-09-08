package com.tickfund.TFService.repositories.tickfund;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.tickfund.TFService.entities.composite_ids.PermissionEntityId;
import com.tickfund.TFService.entities.tickfund.PermissionEntity;

public interface PermissionRepository extends CrudRepository<PermissionEntity, PermissionEntityId> {
    @Cacheable({"findPermissionByRoleId"})
    public ArrayList<PermissionEntity> findByRoleId(Integer roleId);

    public ArrayList<PermissionEntity> findAllByOrderByRoleIdAsc();

    @CacheEvict(cacheNames = "findPermissionByRoleId")
    public void deleteByRoleId(Integer roleId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO permission (role_id, resource_id, action_id)"
            + " VALUES (:roleId, :resourceId, :actionId)", nativeQuery = true)
    public void insertPermission(
            @Param(value = "roleId") Integer roleId,
            @Param(value = "resourceId") Integer resourceId,
            @Param(value = "actionId") Integer actionId);
}
