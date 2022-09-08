package com.tickfund.TFService.controllers;

import com.tickfund.TFService.dtos.in.transaction.TransactionQueryDTO;
import com.tickfund.TFService.dtos.in.transaction.TransactionDTO;
import com.tickfund.TFService.dtos.out.AttachmentOut;
import com.tickfund.TFService.dtos.out.TransactionOut;
import com.tickfund.TFService.entities.tickfund.AttachmentEntity;
import com.tickfund.TFService.entities.tickfund.TransactionEntity;
import com.tickfund.TFService.exceptions.ResourceNotFoundException;
import com.tickfund.TFService.services.AttachmentService;
import com.tickfund.TFService.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${tickfund.domain.my}")
    String MY_DOMAIN;

    final String PROTOCOL_SCHEME = "http";

    @GetMapping("/{id}")
    @ResponseBody
    public TransactionOut getTransactionById(@PathVariable(name = "id") String ID) throws ResourceNotFoundException {

        Optional<TransactionEntity> optionalTransaction = this.transactionService.getTransactionById(ID);
        if (optionalTransaction.isPresent()) {
            return new TransactionOut(optionalTransaction.get(), MY_DOMAIN);
        } else {
            throw new ResourceNotFoundException("Transaction ID %s is not exist".formatted(ID));
        }
    }

    @PostMapping("")
    @ResponseBody

    public Map<String, Object> createTransaction(@Valid @RequestBody TransactionDTO body) {
        Set<String> attachmentIds = body.attachments;

        TransactionEntity transactionEntity = this.dtoToEntity(body);
        String createdTransactionId = this.transactionService.createTransaction(transactionEntity, attachmentIds);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Create transaction successfully");
        response.put("id", createdTransactionId);
        return response;
    }

    TransactionEntity dtoToEntity(TransactionDTO dto) {
        TransactionEntity entity = new TransactionEntity();
        entity.setAmount(dto.amount);
        entity.setHistory(dto.history);
        entity.setCategoryName(dto.categoryName);
        entity.setUserId(dto.userId);
        entity.setCreatorId(dto.creatorId);
        entity.setNote(dto.note);
        return entity;
    }

    @GetMapping("/query")
    @ResponseBody
    public List<TransactionOut> getTransactionsByQuery(@Valid @RequestBody TransactionQueryDTO dto) {
        return this.transactionService
                .getTransactionByQuery(dto)
                .stream()
                .map(e -> new TransactionOut(e, MY_DOMAIN))
                .collect(Collectors.toList());
    }

    List<AttachmentOut> genAttachmentOut(List<AttachmentEntity> attachmentEntities) {
        List<AttachmentOut> attachmentOuts = new ArrayList<>();
        for (AttachmentEntity entity : attachmentEntities) {
            AttachmentOut attachmentOut = new AttachmentOut();
            attachmentOut.setID(entity.getID());
            String realFileUrl = entity.getUrl();
            String fakeFileUrl = "%s://%s/%s".formatted(PROTOCOL_SCHEME, MY_DOMAIN, entity.getID());
            attachmentOut.setPath(fakeFileUrl);
            String fileName = realFileUrl.substring(realFileUrl.lastIndexOf('/') + 1);
            attachmentOut.setName(fileName);
            attachmentOuts.add(attachmentOut);
        }

        return attachmentOuts;
    }
}
