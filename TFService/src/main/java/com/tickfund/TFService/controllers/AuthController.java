package com.tickfund.TFService.controllers;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tickfund.TFService.entities.tickfund.UserEntity;
import com.tickfund.TFService.services.AttachmentService;
import com.tickfund.TFService.services.TokenManager;
import com.tickfund.TFService.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
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

    @Value("${tickfund.domain.sso.server}")
    String SSO_SERVER;

    @Value("${tickfund.domain.my}")
    String MY_DOMAIN;

    final String PROTOCOL_SCHEME = "http";

    static class CodeCheckBody {
        @JsonProperty("code_check")
        boolean codeCheck;

        @JsonProperty("user_id")
        String userId;

        @JsonProperty
        String message;
    }

    @GetMapping("/file")
    @ResponseBody
    public Map<String, Object> getAttachmentById(@RequestParam Integer code) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", attachmentService.authenticateCode(code));
        return response;
    }

    @GetMapping("/login")
    @ResponseBody
    public void login(@RequestParam("appCallbackUrl") String appCallback, HttpServletResponse response,
            HttpServletRequest request) throws IOException {
        final String REDIRECT_SSO = this.genRedirectSso(appCallback);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{" +
                "\"redirect_url\": \"%s\",".formatted(REDIRECT_SSO) +
                "\"message\": \"Not authorized, you must login in sso\"" +
                "}");
    }

    @GetMapping("/ticksso")
    @ResponseBody
    public void tickSsoCallback(@RequestParam("appCallbackUrl") String appCallback, @RequestParam("code") Integer code,
            HttpServletResponse response) {
        WebClient client = WebClient.builder()
                .baseUrl(String.format("%s://%s", PROTOCOL_SCHEME, SSO_SERVER))
                .build();
        try {
            ResponseEntity<CodeCheckBody> codeCheckResponse = client
                    .get()
                    .uri(String.format("/auth/check?code=%d", code))
                    .retrieve()
                    .toEntity(CodeCheckBody.class)
                    .block();
            CodeCheckBody body = codeCheckResponse.getBody();

            if (codeCheckResponse.getStatusCode().is2xxSuccessful() && body != null && body.codeCheck) {
                UserEntity userEntity = userService.getUserById(body.userId);
                String token = tokenManager.generateJwtToken(userEntity);
                Cookie cookie = new Cookie(C_USER, token);
                cookie.setPath("/");
                response.addCookie(cookie);

                response.sendRedirect(appCallback);
            } else {
                final String REDIRECT_SSO = this.genRedirectSso(appCallback);
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write("{" +
                        "\"redirect_url\": \"%s\",".formatted(REDIRECT_SSO) +
                        "\"message\": \"Sso code check fail. You must login in sso again\"" +
                        "}");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }

    String genRedirectSso(String appCallback) {
        final String SERVICE_CALLBACK = String.format("%s://%s", PROTOCOL_SCHEME, MY_DOMAIN) + "/auth/ticksso";
        return String.format("%s://%s?serviceCallbackUrl=%s&appCallbackUrl=%s", PROTOCOL_SCHEME, SSO_SERVER,
                SERVICE_CALLBACK, appCallback);
    }
}
