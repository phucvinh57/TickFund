package com.tickfund.TFService.services;

import com.tickfund.TFService.entities.UserEntity;
import com.tickfund.TFService.entities.UserToken;
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
    @Value("${tickfund.jwt.secret}")
    private String jwtSecret;
    public String generateJwtToken(UserEntity userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(ROLE, userDetails.getRoleEntity().getName());
        return Jwts.builder().setClaims(claims).setSubject(userDetails.getID())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
    }
    public UserToken parseToUserToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        UserToken cUser = new UserToken();
        cUser.setRole(claims.get(ROLE, String.class));
        return cUser;
    }

    public boolean validateFromCookie(Cookie[] cookies, String cookieName){
        cookies = Optional.ofNullable(cookies).orElse(new Cookie[0]);
        Optional<Cookie> optNamedCookie = Arrays.stream(cookies)
                .filter(cookie -> cookie.getName().equals(cookieName))
                .findFirst();
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
