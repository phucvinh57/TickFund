package com.tickfund.TFService.interceptor;

import com.tickfund.TFService.services.TokenManager;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Optional;

@Component
public class CookieInterceptor implements HandlerInterceptor {
    public static final String C_USER = "c_user";
    public static final String USER_TOKEN = "user_token";

    @Autowired
    TokenManager tokenManager;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        Cookie[] cookies = Optional.ofNullable(request.getCookies()).orElse(new Cookie[0]);
        Optional<Cookie> optCUserCookie = Arrays.stream(cookies)
                                    .filter(cookie -> cookie.getName().equals(C_USER))
                                    .findFirst();

        if(request.getMethod().compareToIgnoreCase("OPTIONS") == 0){
            return true;
        }

        if(optCUserCookie.isPresent()) {
            try {
                request.setAttribute(USER_TOKEN, tokenManager.parseToUserToken(optCUserCookie.get().getValue()));
                return true;
            }
            catch (JwtException e){
                // Remove cookie
                Cookie removeCUserCookie = new Cookie(C_USER, null);
                removeCUserCookie.setMaxAge(0);
                response.addCookie(removeCUserCookie);
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                return false;
            }
            catch (Exception e){
                e.printStackTrace();
                throw e;
            }
        }
        else if(request.getHeader("Authorization") != null){
            try {
                final Integer BEARER_LENGTH = 6;
                final String AUTH_HEADER_VALUE = request.getHeader("Authorization");
                request.setAttribute(USER_TOKEN, tokenManager.parseToUserToken(AUTH_HEADER_VALUE.substring(BEARER_LENGTH)));
                return true;
            }
            catch (JwtException e){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                return false;
            }
            catch (Exception e){
                e.printStackTrace();
                throw e;
            }
        }
        else {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return false;
        }
    }
}
