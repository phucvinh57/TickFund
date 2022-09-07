package com.tickfund.TFService.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.tickfund.TFService.services.TokenManager;
import com.tickfund.TFService.utils.CookieUtil;
import com.tickfund.TFService.commons.vos.PermissonVo;
import com.tickfund.TFService.dtos.UserToken;
import com.tickfund.TFService.entities.tickfund.PermissionEntity;
import com.tickfund.TFService.entities.tickfund.UserEntity;
import com.tickfund.TFService.repositories.tickfund.PermissionRepository;
import com.tickfund.TFService.repositories.tickfund.UserRepository;

import static com.tickfund.TFService.interceptor.CookieInterceptor.C_USER;

import java.util.ArrayList;

@Component
public class RbacInterceptor implements HandlerInterceptor {
    @Autowired
    private TokenManager tokenManager;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        PermissonVo requiredPermission = categorizeRequest(
                request.getMethod(), request.getRequestURI());
        String userId = this.getUserIdFromCookie(request.getCookies());
        UserEntity user = this.userRepository.findById(userId).orElse(null);
        if (user == null)
            return false;
        ArrayList<PermissionEntity> userPermissions = permissionRepository.findByRoleId(user.getRole().ID);
        return true;
    }

    private PermissonVo categorizeRequest(String method, String URL) {
        System.out.println(method + " " + URL);
        return null;
    }

    private boolean checkUserPermission(String userId, PermissonVo requiredPermisson) {
        return true;
    }

    private String getUserIdFromCookie(Cookie[] cookies) {
        Cookie userCookie = CookieUtil.getCookieFromName(cookies, C_USER).get();
        UserToken userToken = tokenManager.parseToUserToken(userCookie.getValue());
        return userToken.getUserId();
    }
}
