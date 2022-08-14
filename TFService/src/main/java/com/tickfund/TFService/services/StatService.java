package com.tickfund.TFService.services;

import com.tickfund.TFService.dtos.in.StatDTO;
import com.tickfund.TFService.repositories.tickfund.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class StatService {

    @Autowired
    TransactionRepository transactionRepository;

    public List<Map> getStatistic(StatDTO statDTO){
        switch (statDTO.getPeriodType()){
            case DAY:
                return this.transactionRepository.getStatisticByDay(statDTO.getStart(), statDTO.getEnd());
            case WEEK:
                return this.transactionRepository.getStatisticByWeek(statDTO.getStart(), statDTO.getEnd());
            case MONTH:
                return this.transactionRepository.getStatisticByMonth(statDTO.getStart(), statDTO.getEnd());
            case QUARTER:
                return this.transactionRepository.getStatisticByQuarter(statDTO.getStart(), statDTO.getEnd());
            case YEAR:
                return this.transactionRepository.getStatisticByYear(statDTO.getStart(), statDTO.getEnd());
        }
        return null;
    }
}
