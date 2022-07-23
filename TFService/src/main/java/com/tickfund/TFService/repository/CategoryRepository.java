package com.tickfund.TFService.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tickfund.TFService.entities.CategoryEntity;

@Repository
public interface CategoryRepository extends CrudRepository<CategoryEntity, String> {
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO category (name, type, icon) VALUES "
            + "(:#{#entity.name}, :#{#entity.type.name()}, :#{#entity.icon})", nativeQuery = true)
    public void createCategory(@Param("entity") CategoryEntity entity);

    @Modifying
    @Transactional
    @Query(value = "UPDATE category SET"
            + " name = :#{#entity.name},"
            + " type = :#{#entity.type.name()},"
            + " icon = :#{#entity.icon}"
            + " WHERE name = :oldName", nativeQuery = true)
    public Integer updateByName(@Param("oldName") String oldName,
            @Param("entity") CategoryEntity entity);
}
