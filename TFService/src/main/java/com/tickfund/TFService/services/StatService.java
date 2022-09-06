package com.tickfund.TFService.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tickfund.TFService.commons.enums.CycleEnum;
import com.tickfund.TFService.dtos.in.StatDTO;
import com.tickfund.TFService.dtos.out.StatOut;
import com.tickfund.TFService.entities.StatBucket;
import com.tickfund.TFService.entities.tickfund.CategoryEntity;
import com.tickfund.TFService.entities.tickfund.PlanningEntity;
import com.tickfund.TFService.repositories.tickfund.CategoryRepository;
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

    @Autowired
    CategoryRepository categoryRepository;

    @SuppressWarnings({"rawtypes"})
    public StatOut getStatistic(StatDTO statDTO){
        CycleEnum cycleEnum = CycleEnum.valueOf(statDTO.getPeriod_type());
        List<Map> transactionMapList = null;
        switch (cycleEnum){
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
        Integer previousAmount = Optional.ofNullable(this.transactionRepository.previousTotalIncomeByDay(statDTO.getStart())).orElse(0)
                - Optional.ofNullable(this.transactionRepository.previousTotalExpenseByDay(statDTO.getStart())).orElse(0);

        return new StatOut(transactionBuckets, planningBuckets, previousAmount);
    }

    Stream<StatBucket> planningToBucket(PlanningEntity planningEntity, StatDTO statDTO){
        LocalDate dateTo = statDTO.getEnd();
        LocalDate nextDue = planningEntity.getNextDueDate();
        LocalDate startDate = planningEntity.getStartDate();

        if(nextDue.isAfter(dateTo)) return Stream.empty();
        CycleEnum cycleEnum = CycleEnum.valueOf(statDTO.getPeriod_type());
        ChronoUnit chronoUnit = switch (planningEntity.getCycleUnit()) {
            case WEEK -> ChronoUnit.WEEKS;
            case MONTH -> ChronoUnit.MONTHS;
            case YEAR -> ChronoUnit.YEARS;
            default -> ChronoUnit.DAYS;
        };


        long countdown = 0;
        LocalDate tempNextDue = nextDue;
        while(! dateTo.isBefore(tempNextDue)){
            tempNextDue = tempNextDue.plus(countdown + 1, chronoUnit);
            countdown++;
        }
        // Note that countdown < 0 mean infinity
        if(planningEntity.getCountdown() >= 0){
            countdown = Math.min(countdown, planningEntity.getCountdown());
        }

        return IntStream.range(0, (int) countdown).mapToObj(offset -> {
            // Use calendar because some method of Date class is deprecated
            long resolvedCount = chronoUnit.between(startDate, nextDue);
            LocalDate bucketDate = nextDue.plus(resolvedCount + offset, chronoUnit);
            CategoryEntity categoryEntity = this
                    .categoryRepository
                    .findById(planningEntity.getCategoryName())
                    .orElse(null);
            StatBucket statBucket = new StatBucket();
            statBucket.setCategoryName(planningEntity.getCategoryName());
            statBucket.setCategoryType(categoryEntity.type.getName());
            statBucket.setSum(planningEntity.getAmount());


            switch (cycleEnum){
                case DAY:
                    statBucket.setDay(bucketDate.getDayOfMonth());
                    statBucket.setMonth(bucketDate.getMonthValue());
                    statBucket.setYear(bucketDate.getYear());
                    break;
                case WEEK:
                    statBucket.setWeek(bucketDate.get(WeekFields.ISO.weekOfYear()));
                    statBucket.setYear(bucketDate.getYear());
                    break;
                case MONTH:
                    statBucket.setMonth(bucketDate.getMonthValue());
                    statBucket.setYear(bucketDate.getYear());
                    break;
                case YEAR:
                    statBucket.setYear(bucketDate.getYear());
                    break;
            }
            return statBucket;
        });
    }

//    public static void main(String[] args){
//        LocalDate from = LocalDate.of(2021, 12, 31);
//        LocalDate to = LocalDate.of(2022, 12, 31);
//        System.out.println(ChronoUnit.MONTHS.between(from, to));
//        System.out.println(from.plus(1, ChronoUnit.WEEKS));
//    }
}