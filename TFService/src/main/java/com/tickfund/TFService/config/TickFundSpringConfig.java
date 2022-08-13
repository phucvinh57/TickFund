package com.tickfund.TFService.config;

import com.tickfund.TFService.interceptor.CookieInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class TickFundSpringConfig implements WebMvcConfigurer {

    @Autowired
    CookieInterceptor cookieInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry){
        final  String SSO_CALLBACK = "/auth/login";
        registry.addInterceptor(cookieInterceptor).excludePathPatterns(SSO_CALLBACK);
    }
}
