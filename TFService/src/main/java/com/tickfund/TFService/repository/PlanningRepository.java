package com.tickfund.TFService.repository;

import com.tickfund.TFService.entities.PlanningEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface PlanningRepository extends CrudRepository<PlanningEntity, String> {
    @Query(value = "SELECT user_id, is_repeat, cycle_mode, cycle_unit, has_end_date, end_date, countdown"
            + " FROM planning"
            + " WHERE ID = :ID", nativeQuery = true)
    // Return [ [data...] ]
    public ArrayList<ArrayList<Object>> getExtraPlanningDataById(@Param("ID") String ID);

    @Query(value = "SELECT * FROM planning", nativeQuery = true)
    public ArrayList<ArrayList<Object>> getAll();

    @Query(value = "SELECT p FROM PlanningEntity as p"
            + " WHERE p.countdown <> 0")
    List<PlanningEntity> getAllUnFinishedPlanning();
}
