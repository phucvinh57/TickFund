package com.tickfund.TFService.modules.category.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tickfund.TFService.commons.enums.CategoryType;
import com.tickfund.TFService.modules.category.vo.CategoryVO;

@RestController
@RequestMapping("/categories")
public class CategoryController {
	@GetMapping("/")
	public CategoryVO[] getCategoryList() {
		System.out.println("Get Categories");

		CategoryVO[] categoryList = {
			new CategoryVO("Tiền điện", CategoryType.EXPENSE),
			new CategoryVO("Tiền nước", CategoryType.EXPENSE),
			new CategoryVO("Tiền viễn thông", CategoryType.EXPENSE),
			new CategoryVO("Ăn trưa", CategoryType.EXPENSE),
			new CategoryVO("Tiệc", CategoryType.EXPENSE),
			new CategoryVO("Quỹ Lab", CategoryType.INCOME),
			new CategoryVO("Dự án", CategoryType.INCOME),
			new CategoryVO("Đề tài", CategoryType.INCOME),
			new CategoryVO("Tài trợ", CategoryType.INCOME)
		};

		return categoryList;
	}

	@PostMapping("/new")
	public void postCategory() {
		System.out.println("Post Category");


	}

	
}