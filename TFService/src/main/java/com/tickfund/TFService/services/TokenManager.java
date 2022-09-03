package com.tickfund.TFService.services;

import com.tickfund.TFService.dtos.UserToken;
import com.tickfund.TFService.entities.tickfund.UserEntity;
import com.tickfund.TFService.utils.CookieUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import java.util.*;

@Component
public class TokenManager {
    private static final String ROLE = "role";
    private static final String USER_ID = "user_id";
    @Value("${tickfund.jwt.secret}")
    private String jwtSecret;

    @Value("${tickfund.jwt.expiration}")
    Integer EXPIRATION;

    public String generateJwtToken(UserEntity userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(ROLE, userDetails.getRole().ID);
        claims.put(USER_ID, userDetails.getID());
        return Jwts.builder().setClaims(claims).setSubject(userDetails.getID())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
    }
    public UserToken parseToUserToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        UserToken cUser = new UserToken();
        cUser.setRoleId(Integer.valueOf(claims.get(ROLE, Integer.class)));
        cUser.setUserId(claims.get(USER_ID, String.class));
        return cUser;
    }

    public boolean validateFromCookie(Cookie[] cookies, String cookieName){
        Optional<Cookie> optNamedCookie = CookieUtil.getCookieFromName(cookies, cookieName);
        if(optNamedCookie.isPresent()){
            try{
                Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(optNamedCookie.get().getValue()).getBody();
                return true;
            }
            catch (JwtException e){
                return false;
            }
        }
        else {
            return false;
        }
    }
}
