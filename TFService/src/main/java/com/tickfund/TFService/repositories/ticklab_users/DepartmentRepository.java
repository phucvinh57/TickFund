package com.tickfund.TFService.repositories.ticklab_users;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tickfund.TFService.entities.ticklab_users.DepartmentEntity;

@Repository
public interface DepartmentRepository extends CrudRepository<DepartmentEntity, String> {

}
