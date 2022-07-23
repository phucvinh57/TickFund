package com.tickfund.TFService.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tickfund.TFService.dtos.out.ExtraTransactionDto;
import com.tickfund.TFService.repository.TransactionRepository;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository repository;

    public ExtraTransactionDto getTransactionById(String ID) {
        ArrayList<ArrayList<Object>> data = this.repository.getDetailById(ID);
        if(data.size() == 0) {
            return null;
        }
        return new ExtraTransactionDto(data);
    }
}
