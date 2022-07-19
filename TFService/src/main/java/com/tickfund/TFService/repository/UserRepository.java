package com.tickfund.TFService.repository;

import org.springframework.data.repository.CrudRepository;

import com.tickfund.TFService.entities.User;

public interface UserRepository extends CrudRepository<User, String> {

}