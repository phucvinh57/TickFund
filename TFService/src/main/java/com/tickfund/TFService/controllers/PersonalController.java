package com.tickfund.TFService.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tickfund.TFService.dtos.UserToken;
import com.tickfund.TFService.interceptor.CookieInterceptor;
import com.tickfund.TFService.services.PersonalService;

@RestController
@RequestMapping("/personal")
public class PersonalController {
    @Autowired
    private PersonalService personalService;

    @GetMapping("")
    @ResponseBody
    public Object getInfoWithRole(HttpServletRequest request) {
        UserToken token = (UserToken) request.getAttribute(CookieInterceptor.USER_TOKEN);
        String userId = token.getUserId();;
        return personalService.getInfoWithRole(userId);
    }
}
