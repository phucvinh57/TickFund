package com.tickfund.TFService.repositories.ticklab_users;

import org.springframework.data.repository.CrudRepository;

import com.tickfund.TFService.entities.ticklab_users.PersonalLinkEntity;

public interface PersonalLinkRepository extends CrudRepository<PersonalLinkEntity, Integer> {
    
}
