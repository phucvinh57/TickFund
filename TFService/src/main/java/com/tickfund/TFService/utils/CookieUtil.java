package com.tickfund.TFService.utils;

import javax.servlet.http.Cookie;
import java.util.Arrays;
import java.util.Optional;

public class CookieUtil {
    public static Optional<Cookie> getCookieFromName(Cookie[] cookies, String cookieName){
        cookies = Optional.ofNullable(cookies).orElse(new Cookie[0]);
        return Arrays.stream(cookies)
                .filter(cookie -> cookie.getName().equals(cookieName))
                .findFirst();
    }
}
