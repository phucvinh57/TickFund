package com.tickfund.TFService.repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tickfund.TFService.entities.TransactionEntity;

@Repository
public interface TransactionRepository extends CrudRepository<TransactionEntity, String> {
    @Query("SELECT new Map(DAY(t.history) AS day, MONTH(t.history) AS month, YEAR(t.history) AS year, t.categoryName AS category_name, SUM(t.amount) AS sum)"
            + " FROM TransactionEntity as t"
            + " WHERE t.history BETWEEN :dateFrom AND :dateTo"
            + " GROUP BY t.categoryName, DAY(t.history), MONTH(t.history), YEAR(t.history)")
    public List<Map> getStatisticByDay(@Param("dateFrom") Date dateFrom, @Param("dateTo") Date dateTo);

    @Query("SELECT new Map(WEEK(t.history) AS week, MONTH(t.history) AS month, YEAR(t.history) AS year, t.categoryName AS category_name, SUM(t.amount) AS sum)"
            + " FROM TransactionEntity as t"
            + " WHERE t.history BETWEEN :dateFrom AND :dateTo"
            + " GROUP BY t.categoryName, WEEK(t.history), MONTH(t.history), YEAR(t.history)")
    public List<Map> getStatisticByWeek(@Param("dateFrom") Date dateFrom, @Param("dateTo") Date dateTo);

    @Query("SELECT new Map(MONTH(t.history) AS month, YEAR(t.history) AS year, t.categoryName AS category_name, SUM(t.amount) AS sum)"
            + " FROM TransactionEntity as t"
            + " WHERE t.history BETWEEN :dateFrom AND :dateTo"
            + " GROUP BY t.categoryName, MONTH(t.history), YEAR(t.history)")
    public List<Map> getStatisticByMonth(@Param("dateFrom") Date dateFrom, @Param("dateTo") Date dateTo);

    @Query("SELECT new Map(QUARTER(t.history) AS quarter, YEAR(t.history) AS year, t.categoryName AS category_name, SUM(t.amount) AS sum)"
            + " FROM TransactionEntity as t"
            + " WHERE t.history BETWEEN :dateFrom AND :dateTo"
            + " GROUP BY t.categoryName, QUARTER(t.history), YEAR(t.history)")
    public List<Map> getStatisticByQuarter(@Param("dateFrom") Date dateFrom, @Param("dateTo") Date dateTo);
    @Query("SELECT new Map(YEAR(t.history) AS year, t.categoryName AS category_name, SUM(t.amount) AS sum)"
            + " FROM TransactionEntity as t"
            + " WHERE t.history BETWEEN :dateFrom AND :dateTo"
            + " GROUP BY t.categoryName, YEAR(t.history)")
    public List<Map> getStatisticByYear(@Param("dateFrom") Date dateFrom, @Param("dateTo") Date dateTo);

//    WHERE  ( DateCreated BETWEEN @DateFrom AND @DateTo )
//    OR ( @DateFrom IS NULL
//             AND @DateTo IS NULL )
//    OR ( @DateFrom IS NULL
//             AND DateCreated <= @DateTo )
//    OR ( @DateTo IS NULL
//             AND DateCreated >= @DateFrom )
}
