package com.tickfund.TFService.controllers;

import java.util.ArrayList;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tickfund.TFService.dtos.out.ExtraTransactionDto;
import com.tickfund.TFService.services.TransactionService;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    private TransactionService service;

    @GetMapping("")
    @ResponseBody
    public ArrayList<Object> getCategoryList() {
        return new ArrayList<>();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ExtraTransactionDto getExtraTransactionById(@PathVariable(name = "id") String ID) {
        return this.service.getTransactionById(ID);
    }

    @PostMapping("")
    @ResponseBody
    public Object createCategory(@Valid @RequestBody Object dto) {
        return null;
    }
}
