package com.tickfund.TFService.controllers;

import java.util.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tickfund.TFService.dtos.in.transaction.TransactionQueryDTO;
import com.tickfund.TFService.dtos.in.transaction.TransactionDTO;
import com.tickfund.TFService.entities.TransactionEntity;
import com.tickfund.TFService.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tickfund.TFService.services.TransactionService;

import javax.validation.Valid;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    public static String AMOUNT_KEY = "amount";
    public static String CATEGORY_KEY = "category_name";
    public static String USER_ID_KEY = "user_id";
    public static String CREATOR_ID_KEY = "creator_id";
    public static String HISTORY_KEY = "history";
    public static String NOTE_KEY = "note";
    public static String ATTACHMENTS_KEY = "attachments";
    public static String RESPONSE_MESSAGE = "message";
    public static String RESPONSE_TRANSACTION_ID = "id";
    @Autowired
    private TransactionService service;

    @GetMapping("/{id}")
    @ResponseBody
    public TransactionEntity getTransactionById(@PathVariable(name = "id") String ID) throws ResourceNotFoundException {
        Optional<TransactionEntity> optionalTransaction =  this.service.getTransactionById(ID);
        if(optionalTransaction.isPresent()){
            return optionalTransaction.get();
        }
        else {
            throw new ResourceNotFoundException("Transaction ID %s is not exist".formatted(ID));
        }
    }

    @PostMapping("/new")
    @ResponseBody
    public Map createTransactionNew(@Valid @RequestBody TransactionDTO body) {
        Map<String, Object> tempMap = new ObjectMapper().convertValue(body, Map.class);
        Set<String> attachmentIds = body.attachments;
        tempMap.remove("attachments");

        TransactionEntity transactionEntity = new ObjectMapper().convertValue(tempMap, TransactionEntity.class);
        String createdTransactionId = this.service.createTransaction(transactionEntity, attachmentIds);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Create transaction successfully");
        response.put("id", createdTransactionId);
        return response;
    }


    @PostMapping("")
    @ResponseBody
    public List<TransactionEntity> getTransactionsByQuery(@Valid @RequestBody TransactionQueryDTO dto) {
        return this.service.getTransactionByQuery(dto);
    }
}
