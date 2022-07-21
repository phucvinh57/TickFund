package com.tickfund.TFService.repository;

import org.springframework.data.repository.CrudRepository;

import com.tickfund.TFService.entities.TickLabUser;

public interface UserRepository extends CrudRepository<TickLabUser, String> {

}