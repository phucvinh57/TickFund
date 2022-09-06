package com.tickfund.TFService.repositories.tickfund;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tickfund.TFService.entities.tickfund.TransactionEntity;

@Repository
public interface TransactionRepository extends CrudRepository<TransactionEntity, String> {
    @Query("SELECT new Map(DAY(t.history) AS day, MONTH(t.history) AS month, YEAR(t.history) AS year, t.categoryName AS category_name, t.categoryType as type, SUM(t.amount) AS sum)"
            + " FROM TransactionEntity as t"
            + " WHERE t.history BETWEEN :dateFrom AND :dateTo"
            + " GROUP BY t.categoryName, t.categoryType, DAY(t.history), WEEK(t.history, 1), MONTH(t.history), YEAR(t.history)")
    public List<Map> getStatisticByDay(@Param("dateFrom") LocalDate dateFrom, @Param("dateTo") LocalDate dateTo);

    @Query("SELECT new Map(WEEK(t.history, 1) AS week, YEAR(t.history) AS year, t.categoryName AS category_name, t.categoryType as type, SUM(t.amount) AS sum)"
            + " FROM TransactionEntity as t"
            + " WHERE t.history BETWEEN :dateFrom AND :dateTo"
            + " GROUP BY t.categoryName, t.categoryType, WEEK(t.history, 1), MONTH(t.history), YEAR(t.history)")
    public List<Map> getStatisticByWeek(@Param("dateFrom") LocalDate dateFrom, @Param("dateTo") LocalDate dateTo);

    @Query("SELECT new Map(MONTH(t.history) AS month, YEAR(t.history) AS year, t.categoryName AS category_name, t.categoryType as type, SUM(t.amount) AS sum)"
            + " FROM TransactionEntity as t"
            + " WHERE t.history BETWEEN :dateFrom AND :dateTo"
            + " GROUP BY t.categoryName, t.categoryType, MONTH(t.history), YEAR(t.history)")
    public List<Map> getStatisticByMonth(@Param("dateFrom") LocalDate dateFrom, @Param("dateTo") LocalDate dateTo);

    @Query("SELECT new Map(QUARTER(t.history) AS quarter, YEAR(t.history) AS year, t.categoryName AS category_name, t.categoryType as type, SUM(t.amount) AS sum)"
            + " FROM TransactionEntity as t"
            + " WHERE t.history BETWEEN :dateFrom AND :dateTo"
            + " GROUP BY t.categoryName, t.categoryType, QUARTER(t.history), YEAR(t.history)")
    public List<Map> getStatisticByQuarter(@Param("dateFrom") LocalDate dateFrom, @Param("dateTo") LocalDate dateTo);
    @Query("SELECT new Map(YEAR(t.history) AS year, t.categoryName AS category_name, t.categoryType as type, SUM(t.amount) AS sum)"
            + " FROM TransactionEntity as t"
            + " WHERE t.history BETWEEN :dateFrom AND :dateTo"
            + " GROUP BY t.categoryName, t.categoryType, YEAR(t.history)")
    public List<Map> getStatisticByYear(@Param("dateFrom") LocalDate dateFrom, @Param("dateTo") LocalDate dateTo);

    @Query("SELECT SUM(t.amount)"
            + " FROM TransactionEntity as t"
            + " WHERE t.history < :dateEnd AND t.categoryType = 'INCOME'")
    public Integer previousTotalIncomeByDay(@Param("dateEnd") LocalDate day);
    @Query("SELECT SUM(t.amount)"
            + " FROM TransactionEntity as t"
            + " WHERE t.history < :dateEnd AND t.categoryType = 'EXPENSE'")
    public Integer previousTotalExpenseByDay(@Param("dateEnd") LocalDate day);
}
