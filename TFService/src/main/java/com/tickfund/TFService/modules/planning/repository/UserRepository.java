package com.tickfund.TFService.modules.planning.repository;

import org.springframework.data.repository.CrudRepository;

import com.tickfund.TFService.modules.planning.entity.User;

public interface UserRepository extends CrudRepository<User, String> {

}