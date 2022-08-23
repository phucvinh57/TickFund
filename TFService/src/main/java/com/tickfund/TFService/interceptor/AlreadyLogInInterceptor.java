package com.tickfund.TFService.interceptor;

import com.tickfund.TFService.services.TokenManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.tickfund.TFService.interceptor.CookieInterceptor.C_USER;

@Component
public class AlreadyLogInInterceptor implements HandlerInterceptor {

    @Autowired
    TokenManager tokenManager;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        if(tokenManager.validateFromCookie(request.getCookies(), C_USER)){
            response.getWriter().write("You already logged in");
            return false;
        }
        else {
            return true;
        }
    }
}
