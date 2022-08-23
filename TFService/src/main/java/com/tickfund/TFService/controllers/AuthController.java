package com.tickfund.TFService.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tickfund.TFService.entities.UserEntity;
import com.tickfund.TFService.services.AttachmentService;
import com.tickfund.TFService.services.TokenManager;
import com.tickfund.TFService.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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

    @Value("${tickfund.jwt.cookie.expiration}")
    Integer MAX_AGE;

    @Value("${tickfund.domain.sso.server}")
    String SSO_SERVER;

    @Value("${tickfund.domain.my}")
    String MY_DOMAIN;

    final String PROTOCOL_SCHEME = "http";

    @GetMapping("/file")
    @ResponseBody
    public Map getTransactionById(@RequestParam Integer code)  {
        Map<String, Object> response = new HashMap<>();
        response.put("message", attachmentService.authenticateCode(code));
        return response;
    }

    @GetMapping("/login")
    @ResponseBody
    public void login(HttpServletResponse response, HttpServletRequest request) throws IOException {
        final String SERVICE_CALLBACK = String.format("%s://%s", PROTOCOL_SCHEME, MY_DOMAIN) + "/auth/ticksso";
        response.sendRedirect(String.format("%s://%s?serviceCallbackUrl=%s", PROTOCOL_SCHEME, SSO_SERVER, SERVICE_CALLBACK));

    }

    @GetMapping("/ticksso")
    @ResponseBody
    @SuppressWarnings({"unchecked"})
    public void tickSsoCallback(@RequestParam("appCallbackUrl") String appCallback, @RequestParam Integer code, HttpServletResponse response)  {
        WebClient client = WebClient.builder()
                .baseUrl(String.format("%s://%s", PROTOCOL_SCHEME, SSO_SERVER))
                .build();
        try {
            var codeCheckResponse = client
                    .get()
                    .uri(String.format("/auth/check?code=%d", code))
                    .retrieve()
                    .toEntity(String.class)
                    .block();

            Map<String, Object> map = new ObjectMapper().readValue(codeCheckResponse.getBody(), Map.class);

            if(codeCheckResponse.getStatusCode().is2xxSuccessful() && (Boolean) map.get("code_check")){
                UserEntity userEntity = userService.getUserById("nhancdt");
                String token = tokenManager.generateJwtToken(userEntity);
                Cookie cookie = new Cookie(C_USER, token);
                cookie.setPath("/");
                cookie.setMaxAge(MAX_AGE);
                response.addCookie(cookie);
                response.getWriter().write("Login successfully");
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }

        // TODO: Handle situation in which code is not valid
    }
}
