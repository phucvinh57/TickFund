package com.tickfund.TFService.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tickfund.TFService.services.PersonalService;

@RestController
@RequestMapping("/personal")
public class PersonalController {
    @Autowired
    private PersonalService personalService;

    @GetMapping("")
	@ResponseBody
    public Object getInfoWithRole() {
        return personalService.getInfoWithRole();
    }
}
