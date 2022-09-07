package com.tickfund.TFService.repositories.tickfund;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;

import com.tickfund.TFService.entities.composite_ids.ResourceActionMappingEntityId;
import com.tickfund.TFService.entities.tickfund.ResourceActionMappingEntity;

public interface ResourceActionMappingRepository
        extends CrudRepository<ResourceActionMappingEntity, ResourceActionMappingEntityId> {
    @Override
    @Cacheable("getAllResourceActionMapping")
    public Iterable<ResourceActionMappingEntity> findAll();
}
