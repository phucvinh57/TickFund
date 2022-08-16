package com.tickfund.TFService.repositories.ticklab_users;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tickfund.TFService.entities.ticklab_users.TickLabUserEntity;

@Repository
public interface TickLabUserRepository extends CrudRepository<TickLabUserEntity, String> {
    @Query(value = "SELECT new Map("
            + "tlu.ID AS ID, tlu.name AS name, tlu.username AS username, "
            + "tlu.expertise AS expertise, tlu.active AS active, tlu.department AS department)"
            + " FROM TickLabUserEntity AS tlu"
            + " ORDER BY tlu.ID ASC")
    public ArrayList<Object> getAllAccountsInfo();
}