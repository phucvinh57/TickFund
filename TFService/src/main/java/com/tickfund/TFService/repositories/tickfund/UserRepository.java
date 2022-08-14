package com.tickfund.TFService.repositories.tickfund;

import org.springframework.data.repository.CrudRepository;

import com.tickfund.TFService.entities.tickfund.UserEntity;

public interface UserRepository extends CrudRepository<UserEntity, String> {

}