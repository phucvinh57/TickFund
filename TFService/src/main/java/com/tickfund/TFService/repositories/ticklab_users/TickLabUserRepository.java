package com.tickfund.TFService.repositories.ticklab_users;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tickfund.TFService.entities.ticklab_users.TickLabUserEntity;

@Repository
public interface TickLabUserRepository extends CrudRepository<TickLabUserEntity, String> {
    @Query(value = "SELECT *"
            + " FROM account", nativeQuery = true)
    // Return [ [data...] ]
    public ArrayList<Object> getAll();
}