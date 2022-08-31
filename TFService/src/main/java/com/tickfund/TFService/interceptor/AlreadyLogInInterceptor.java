package com.tickfund.TFService.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tickfund.TFService.dtos.out.CheckLoginOut;
import com.tickfund.TFService.entities.UserToken;
import com.tickfund.TFService.entities.tickfund.UserEntity;
import com.tickfund.TFService.services.TokenManager;
import com.tickfund.TFService.utils.CookieUtil;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Optional;

import static com.tickfund.TFService.interceptor.CookieInterceptor.C_USER;

@Component
public class AlreadyLogInInterceptor implements HandlerInterceptor {

    @Autowired
    TokenManager tokenManager;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        if(tokenManager.validateFromCookie(request.getCookies(), C_USER)){
            Cookie userCookie= CookieUtil.getCookieFromName(request.getCookies(), C_USER).get();

            UserToken userToken = tokenManager.parseToUserToken(userCookie.getValue());

            ObjectMapper objectMapper = new ObjectMapper();
            CheckLoginOut checkLoginOut = this.toSuccessCheckLoginOut(userToken);
            String jsonOut = objectMapper.writeValueAsString(checkLoginOut);

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(jsonOut);
            return false;
        }
        else {
            return true;
        }
    }

    CheckLoginOut toSuccessCheckLoginOut(UserToken token){
        CheckLoginOut out = new CheckLoginOut();
        out.setCode(true);
        out.setMessage("Already login");
        out.setRole(token.getRole());
        out.setUserId(token.getUserId());
        return out;
    }
}
