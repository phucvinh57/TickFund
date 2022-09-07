package com.tickfund.TFService.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.tickfund.TFService.services.TokenManager;
import com.tickfund.TFService.utils.CookieUtil;
import com.tickfund.TFService.commons.vos.RequiredPermissonVo;
import com.tickfund.TFService.dtos.UserToken;
import com.tickfund.TFService.entities.tickfund.PermissionEntity;
import com.tickfund.TFService.entities.tickfund.ResourceActionMappingEntity;
import com.tickfund.TFService.entities.tickfund.UserEntity;
import com.tickfund.TFService.repositories.tickfund.PermissionRepository;
import com.tickfund.TFService.repositories.tickfund.ResourceActionMappingRepository;
import com.tickfund.TFService.repositories.tickfund.UserRepository;

import static com.tickfund.TFService.interceptor.CookieInterceptor.C_USER;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

@Component
public class RbacInterceptor implements HandlerInterceptor {
    @Autowired
    private TokenManager tokenManager;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private ResourceActionMappingRepository ramRepository;

    @Autowired
    private UserRepository userRepository;

    private final String GET = "GET";
    private final String POST = "POST";
    private final String PUT = "PUT";
    private final String DELETE = "DELETE";

    private HashMap<String, RequiredPermissonVo> requirePermissionMap;

    @Autowired
    public RbacInterceptor(ResourceActionMappingRepository repository) {
        this.ramRepository = repository;
        this.requirePermissionMap = new HashMap<>();
        Iterable<ResourceActionMappingEntity> mappings = ramRepository.findAll();
        for (ResourceActionMappingEntity map : mappings) {
            // Transaction Resource
            RequiredPermissonVo requiredPermissonVo = new RequiredPermissonVo(map.resource.ID, map.action.ID);

            if (map.resource.ID == 1) {
                if (map.action.name.equals("CREATE")) {

                    this.requirePermissionMap.put(this.POST + " /transactions", requiredPermissonVo);
                } else if (map.action.name.equals("DISABLE"))
                    this.requirePermissionMap.put(this.PUT + " /transactions/disable", requiredPermissonVo);
            }
            // Planning Resource
            else if (map.resource.ID == 2) {
                if (map.action.name.equals("CREATE"))
                    this.requirePermissionMap.put(this.POST + " /plannings", requiredPermissonVo);
                else if (map.action.name.equals("UPDATE"))
                    this.requirePermissionMap.put(this.PUT + " /plannings/(.*)", requiredPermissonVo);
                else if (map.action.name.equals("DELETE"))
                    this.requirePermissionMap.put(this.DELETE + " /plannings/(.*)", requiredPermissonVo);
            }
            // Account Resource
            else if (map.resource.ID == 3) {
                if (map.action.name.equals("CREATE"))
                    this.requirePermissionMap.put(this.POST + " /users", requiredPermissonVo);
                else if (map.action.name.equals("UPDATE")) {
                    this.requirePermissionMap.put(this.PUT + " /users/role", requiredPermissonVo);
                    this.requirePermissionMap.put(this.PUT + " /users/department", requiredPermissonVo);
                } else if (map.action.name.equals("DISABLE"))
                    this.requirePermissionMap.put(this.PUT + " /users/disable", requiredPermissonVo);
            }
            // Role Resource
            else if (map.resource.ID == 4) {
                if (map.action.name.equals("READ"))
                    this.requirePermissionMap.put(this.GET + " /roles", requiredPermissonVo);
                else if (map.action.name.equals("UPDATE")) {
                    this.requirePermissionMap.put(this.PUT + " /roles/name", requiredPermissonVo);
                    this.requirePermissionMap.put(this.PUT + " /roles/permission", requiredPermissonVo);
                }
            }
        }
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        RequiredPermissonVo requiredPermission = categorizeRequest(
                request.getMethod(), request.getRequestURI());

        // If the API request doesn't need permission
        if (requiredPermission == null) {
            return true;
        }

        String userId = this.getUserIdFromCookie(request.getCookies());
        UserEntity user = this.userRepository.findById(userId).orElse(null);
        if (user == null)
            return false;
        ArrayList<PermissionEntity> userPermissions = permissionRepository.findByRoleId(user.getRole().ID);

        boolean isValidApiCall = false;
        for (PermissionEntity permission : userPermissions) {
            if (requiredPermission.resourceId == permission.resource.ID
                    && requiredPermission.actionId == permission.action.ID) {
                isValidApiCall = true;
                break;
            }
        }
        return isValidApiCall;
    }

    private RequiredPermissonVo categorizeRequest(String method, String URL) {
        String api = method + " " + URL;
        Set<String> keys = this.requirePermissionMap.keySet();
        for (String key : keys) {
            if (api.matches(key))
                return this.requirePermissionMap.get(key);
        }
        return null;
    }

    private String getUserIdFromCookie(Cookie[] cookies) {
        Cookie userCookie = CookieUtil.getCookieFromName(cookies, C_USER).get();
        UserToken userToken = tokenManager.parseToUserToken(userCookie.getValue());
        return userToken.getUserId();
    }
}
