package com.tickfund.TFService.repository;

import com.tickfund.TFService.entities.UserEntity;
import org.springframework.data.repository.CrudRepository;

import com.tickfund.TFService.entities.TickLabUser;

public interface UserRepository extends CrudRepository<UserEntity, String> {

}