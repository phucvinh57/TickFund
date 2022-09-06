package com.tickfund.TFService.repositories.ticklab_users;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tickfund.TFService.dtos.in.user.CreateUserDto;
import com.tickfund.TFService.entities.ticklab_users.TickLabUserEntity;

@Repository
public interface TickLabUserRepository extends CrudRepository<TickLabUserEntity, String> {
    @Query(value = "SELECT new Map("
            + "tlu.ID AS ID, tlu.name AS name, tlu.username AS username,"
            + " tlu.avatarURL AS avatarUrl,"
            + " tlu.expertise AS expertise, tlu.active AS active, tlu.department AS department)"
            + " FROM TickLabUserEntity AS tlu"
            + " ORDER BY tlu.ID ASC")
    public ArrayList<Object> getAllAccountsInfo();

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO account ("
            + "ID, username, name, phone, email, "
            + "department_id, expertise"
            + ") VALUES ("
            + ":#{#dto.ID}, :#{#username}, :#{#dto.name}, "
            + ":#{#dto.phone}, :#{#dto.email}, "
            + ":#{#dto.departmentId}, :#{#dto.expertise.getName()}"
            + ")", nativeQuery = true)
    public void createAccount(@Param("username") String username, @Param("dto") CreateUserDto dto);
}