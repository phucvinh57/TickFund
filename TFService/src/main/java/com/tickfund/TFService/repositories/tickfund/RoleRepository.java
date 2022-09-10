package com.tickfund.TFService.repositories.tickfund;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tickfund.TFService.entities.tickfund.RoleEntity;

@Repository
public interface RoleRepository extends CrudRepository<RoleEntity, Integer>{
    @Override
    @Cacheable("getAllRoles")
    public Iterable<RoleEntity> findAll();
}
