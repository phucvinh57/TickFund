package com.tickfund.TFService.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tickfund.TFService.dtos.in.StatDTO;
import com.tickfund.TFService.dtos.out.StatOut;
import com.tickfund.TFService.entities.StatBucket;
import com.tickfund.TFService.entities.tickfund.PlanningEntity;
import com.tickfund.TFService.repositories.tickfund.PlanningRepository;
import com.tickfund.TFService.repositories.tickfund.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Service
public class StatService {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    PlanningRepository planningRepository;

    @SuppressWarnings({"rawtypes"})
    public StatOut getStatistic(StatDTO statDTO){
        List<Map> transactionMapList = null;
        switch (statDTO.getPeriodType()){
            case DAY:
                transactionMapList = this.transactionRepository.getStatisticByDay(statDTO.getStart(), statDTO.getEnd());
                break;
            case WEEK:
                transactionMapList =  this.transactionRepository.getStatisticByWeek(statDTO.getStart(), statDTO.getEnd());
                break;
            case MONTH:
                transactionMapList =  this.transactionRepository.getStatisticByMonth(statDTO.getStart(), statDTO.getEnd());
                break;
            case QUARTER:
                transactionMapList =  this.transactionRepository.getStatisticByQuarter(statDTO.getStart(), statDTO.getEnd());
                break;
            case YEAR:
                transactionMapList =  this.transactionRepository.getStatisticByYear(statDTO.getStart(), statDTO.getEnd());
                break;
        }
        ObjectMapper objectMapper = new ObjectMapper();
        List<StatBucket> transactionBuckets = transactionMapList
                .stream()
                .map(transactionMap -> objectMapper.convertValue(transactionMap, StatBucket.class))
                .toList();

        List<PlanningEntity> planningEntityList = planningRepository.getAllUnFinishedPlanning();
        List<StatBucket> planningBuckets = planningEntityList
                .stream()
                .flatMap(p -> planningToBucket(p, statDTO))
                .collect(StatBucket.collectorToList());
        Integer previousAmount = Optional.ofNullable(this.transactionRepository.previousTotalIncomeByDay(statDTO.getStart())).orElse(0) -
                - Optional.ofNullable(this.transactionRepository.previousTotalExpenseByDay(statDTO.getStart())).orElse(0);

        return new StatOut(transactionBuckets, planningBuckets, previousAmount);
    }

    Stream<StatBucket> planningToBucket(PlanningEntity planningEntity, StatDTO statDTO){
        LocalDate dateTo = statDTO.getEnd();
        LocalDate nextDue = planningEntity.nextDueDate;

        if(nextDue.isAfter(dateTo)) return Stream.empty();

        ChronoUnit chronoUnit = switch (statDTO.getPeriodType()) {
            case WEEK -> ChronoUnit.WEEKS;
            case MONTH -> ChronoUnit.MONTHS;
            case YEAR -> ChronoUnit.YEARS;
            default -> ChronoUnit.DAYS;
        };

        final long rangeEnd = chronoUnit.between(nextDue, dateTo);

        return IntStream.range(0, (int) rangeEnd + 1).mapToObj(offset -> {
            // Use calendar because some method of Date class is deprecated
            LocalDate bucketDate = nextDue.plus(offset, statDTO.getPeriodType().toCalendarMagicField());

            StatBucket statBucket = new StatBucket();
            statBucket.setCategoryName(planningEntity.categoryName);
            statBucket.setCategoryType(planningEntity.categoryType.name());
            statBucket.setSum(planningEntity.amount);

            // Note: don't add break statement here
            switch (statDTO.getPeriodType()){
                case DAY:
                    statBucket.setDay(bucketDate.getDayOfMonth());
                case WEEK:
                    // Plus 1 here because Week.ISO starts at 0
                    statBucket.setWeek(bucketDate.get(WeekFields.ISO.weekOfYear()));
                case MONTH:
                    statBucket.setMonth(bucketDate.getMonthValue());
                case YEAR:
                    statBucket.setYear(bucketDate.getYear());
            }
            return statBucket;
        });
    }
}