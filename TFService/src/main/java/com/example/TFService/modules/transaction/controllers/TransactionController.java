package com.example.TFService.modules.transaction.controllers;

import com.example.TFService.modules.transaction.exception.TransactionExcept;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TFService.modules.common.CategoryVO;
import com.example.TFService.modules.transaction.vo.Transaction;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
	@GetMapping("/{id}")
	public Transaction getTransaction(@PathVariable String id) {
		System.out.println("Transaction called");

		try {
			Transaction.Builder builder = new Transaction.Builder();
			CategoryVO cat = new CategoryVO("Tien nha", CategoryVO.CategoryType.INCOME);
			Transaction transactionVO = builder
											.setNote("Nhan dep")
											.setUserId("Nhan cu")
											.setCategory(cat)
											.build();
			return transactionVO;
		}
		catch (TransactionExcept.MissingField ex){
			return null;
		}
	}
}