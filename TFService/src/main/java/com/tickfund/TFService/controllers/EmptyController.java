package com.tickfund.TFService.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/")
public class EmptyController {
    @GetMapping("")
    public void get(HttpServletResponse response){
        response.setStatus(HttpServletResponse.SC_ACCEPTED);
    }
}
