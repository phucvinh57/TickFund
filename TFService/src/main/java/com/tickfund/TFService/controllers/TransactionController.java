package com.tickfund.TFService.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tickfund.TFService.dtos.in.transaction.TransactionQueryDTO;
import com.tickfund.TFService.dtos.in.transaction.TransactionDTO;
import com.tickfund.TFService.dtos.out.TransactionOut;
import com.tickfund.TFService.entities.tickfund.TransactionEntity;
import com.tickfund.TFService.exceptions.ResourceNotFoundException;
import com.tickfund.TFService.services.AttachmentService;
import com.tickfund.TFService.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @Autowired
    AttachmentService attachmentService;

    @GetMapping("/{id}")
    @ResponseBody
    public TransactionOut getTransactionById(@PathVariable(name = "id") String ID) throws ResourceNotFoundException {
        Optional<TransactionEntity> optionalTransaction =  this.transactionService.getTransactionById(ID);
        if(optionalTransaction.isPresent()){
            return new TransactionOut(optionalTransaction.get());
        }
        else {
            throw new ResourceNotFoundException("Transaction ID %s is not exist".formatted(ID));
        }
    }

    @PostMapping("/new")
    @ResponseBody
//    @SuppressWarnings("unchecked")
    public Map<String, Object> createTransaction(@Valid @RequestBody TransactionDTO body) {
        Map tempMap = new ObjectMapper().convertValue(body, Map.class);
        Set<String> attachmentIds = body.attachments;
        tempMap.remove("attachments");

        TransactionEntity transactionEntity = new ObjectMapper().convertValue(tempMap, TransactionEntity.class);
        String createdTransactionId = this.transactionService.createTransaction(transactionEntity, attachmentIds);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Create transaction successfully");
        response.put("id", createdTransactionId);
        return response;
    }

    @PostMapping("")
    @ResponseBody
    public List<TransactionOut> getTransactionsByQuery(@Valid @RequestBody TransactionQueryDTO dto) {
        return this
                .transactionService
                .getTransactionByQuery(dto)
                .stream()
                .map(TransactionOut::new)
                .collect(Collectors.toList());
    }
}
