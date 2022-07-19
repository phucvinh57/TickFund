package com.tickfund.TFService.modules.transaction.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tickfund.TFService.commons.enums.CategoryType;
import com.tickfund.TFService.exceptions.TransactionExcept;
import com.tickfund.TFService.modules.category.vo.CategoryVO;
import com.tickfund.TFService.modules.transaction.vo.Transaction;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
	@GetMapping("/{id}")
	public Transaction getTransaction(@PathVariable String id) {
		System.out.println("Transaction called");

		try {
			Transaction.Builder builder = new Transaction.Builder();
			CategoryVO cat = new CategoryVO("Tien nha", CategoryType.INCOME, "");
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