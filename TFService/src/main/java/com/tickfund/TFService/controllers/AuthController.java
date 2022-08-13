package com.tickfund.TFService.controllers;

import com.tickfund.TFService.entities.UserEntity;
import com.tickfund.TFService.services.TokenManager;
import com.tickfund.TFService.services.AttachmentService;
import com.tickfund.TFService.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

import static com.tickfund.TFService.interceptor.CookieInterceptor.C_USER;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AttachmentService attachmentService;

    @Autowired
    UserService userService;

    @Autowired
    TokenManager tokenManager;

    @Value("${tickfnd.jwt.expiration}")
    Integer MAX_AGE;

    @GetMapping("/file")
    @ResponseBody
    public Map getTransactionById(@RequestParam Integer code)  {
        Map<String, Object> response = new HashMap<>();
        response.put("message", attachmentService.authenticateCode(code));
        return response;
    }

    @GetMapping("/login")
    @ResponseBody
    public void loginCallback(HttpServletResponse response){
        UserEntity userEntity = userService.getUserById("nhancdt");
        String token = tokenManager.generateJwtToken(userEntity);
        Cookie cookie = new Cookie(C_USER, token);
        cookie.setPath("/");
        cookie.setMaxAge(MAX_AGE);
        response.addCookie(cookie);
    }
}
