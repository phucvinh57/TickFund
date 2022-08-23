package com.tickfund.TFService.repository;

import com.tickfund.TFService.entities.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, String> {

}