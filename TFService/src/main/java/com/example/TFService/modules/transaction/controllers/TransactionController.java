package com.example.TFService.modules.transaction.controllers;

import java.util.Locale.Category;

import com.example.TFService.modules.transaction.TransactionExcept;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TFService.modules.common.CategoryVO;
import com.example.TFService.modules.transaction.vo.TransactionVO;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
	@GetMapping("/{id}")
	public TransactionVO getTransaction(@PathVariable String id) {
		System.out.println("Transaction called");

		try {
			TransactionVO.Builder builder = new TransactionVO.Builder();
			CategoryVO cat = new CategoryVO("Tien nha", CategoryVO.CategoryType.INCOME);
			TransactionVO transactionVO = builder
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