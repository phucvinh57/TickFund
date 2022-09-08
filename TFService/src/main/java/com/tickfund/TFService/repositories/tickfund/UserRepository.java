package com.tickfund.TFService.repositories.tickfund;

import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.tickfund.TFService.entities.tickfund.UserEntity;

public interface UserRepository extends CrudRepository<UserEntity, String> {
    public List<UserEntity> findAllByOrderByIDAsc();

    @Override
    @Cacheable("getUserById")
    public Optional<UserEntity> findById(String userId);

    @Override
    @CacheEvict(cacheNames = "getUserById")
    public <S extends UserEntity> S save(S s);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO user (ID, role_id) VALUES (:#{#userId}, :#{#roleId})", nativeQuery = true)
    public void createUserWithRole(@Param("userId") String userId, @Param("roleId") Integer roleId);
}