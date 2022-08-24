package com.tickfund.TFService.config;

import com.tickfund.TFService.interceptor.AlreadyLogInInterceptor;
import com.tickfund.TFService.interceptor.CacheInterceptor;
import com.tickfund.TFService.interceptor.CookieInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class TickFundSpringConfig implements WebMvcConfigurer {

    @Autowired
    CookieInterceptor cookieInterceptor;

    @Autowired
    AlreadyLogInInterceptor alreadyLogInInterceptor;

    @Autowired
    CacheInterceptor cacheInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry){
        final String LOGIN_PATH = "/auth/login";
        final String SSO_CALLBACK_PATH = "/auth/ticksso";
        registry.addInterceptor(cookieInterceptor).excludePathPatterns(LOGIN_PATH, SSO_CALLBACK_PATH);
        registry.addInterceptor(alreadyLogInInterceptor).addPathPatterns(LOGIN_PATH, SSO_CALLBACK_PATH);
        registry.addInterceptor(cacheInterceptor);
    }
}
