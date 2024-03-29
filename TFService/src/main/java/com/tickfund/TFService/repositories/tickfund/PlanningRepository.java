package com.tickfund.TFService.repositories.tickfund;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import com.tickfund.TFService.entities.tickfund.PlanningEntity;

@Repository
public interface PlanningRepository extends CrudRepository<PlanningEntity, String> {
//    @Query(value = "SELECT user_id, is_repeat, cycle_mode, cycle_unit, has_end_date, end_date, countdown"
//            + " FROM planning"
//            + " WHERE ID = :ID", nativeQuery = true)
//    // Return [ [data...] ]
//    public ArrayList<ArrayList<Object>> getExtraPlanningDataById(@Param("ID") String ID);
//
//    @Query(value = "SELECT * FROM planning", nativeQuery = true)
//    public ArrayList<ArrayList<Object>> getAll();

    @Query(value = "SELECT p FROM PlanningEntity as p"
            + " WHERE p.countdown <> 0")
    List<PlanningEntity> getAllUnFinishedPlanning();
}
