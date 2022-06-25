package com.example.TFService.modules.transaction.controllers;

import com.example.TFService.exceptions.BodyRequestFieldMissing;
import com.example.TFService.modules.transaction.services.TransactionService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.example.TFService.modules.transaction.entity.Transaction;
import com.example.TFService.exceptions.TransactionMissingField;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
	TransactionService transactionService = new TransactionService();
	@GetMapping("/{id}")
	public Transaction getTransaction(@PathVariable String id) {
		System.out.println("Transaction called");
		Transaction transaction = transactionService.getTransactionById(id);
		if(transaction == null){
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction with id %s is not found".formatted(id));
		}
		else{
			return transaction;
		}
	}

	@PostMapping("/new")
	public Transaction addTransaction(@RequestBody Transaction transaction){
		try {

			Transaction transactionWithId = new Transaction.Builder()
					.copyProperties(transaction)
					.setId(transactionService.genUID()).build();
			System.out.println(transactionWithId);
			return transactionService.addTransaction(transactionWithId);
		}
		catch (TransactionMissingField ex){
			throw new BodyRequestFieldMissing(ex.getFieldName());
		}
		catch (Exception ex){
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}