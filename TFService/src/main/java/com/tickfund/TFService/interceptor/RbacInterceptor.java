package com.tickfund.TFService.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.tickfund.TFService.dtos.UserToken;
import com.tickfund.TFService.entities.tickfund.PermissionEntity;
import com.tickfund.TFService.entities.tickfund.ResourceActionMappingEntity;
import com.tickfund.TFService.entities.tickfund.UserEntity;
import com.tickfund.TFService.repositories.tickfund.PermissionRepository;
import com.tickfund.TFService.repositories.tickfund.ResourceActionMappingRepository;
import com.tickfund.TFService.repositories.tickfund.UserRepository;
// import com.tickfund.TFService.commons.enums.ApiPath;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

@Component
public class RbacInterceptor implements HandlerInterceptor {
    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private ResourceActionMappingRepository ramRepository;

    @Autowired
    private UserRepository userRepository;

    private final String FORBIDDEN_MSG = "Access denied !";
    private final String USER_INVALID_MSG = "User does not exist !";

    private final String GET_METHOD = "GET";
    private final String POST_METHOD = "POST";
    private final String PUT_METHOD = "PUT";
    private final String DELETE_METHOD = "DELETE";

    private HashMap<String, ResourceActionMappingEntity> requirePermissionMap;

    @Autowired
    public RbacInterceptor(ResourceActionMappingRepository repository) {
        this.ramRepository = repository;
        this.requirePermissionMap = new HashMap<>();
        final Iterable<ResourceActionMappingEntity> mappings = ramRepository.findAll();
        for (ResourceActionMappingEntity map : mappings) {
            // Transaction Resource

            if (map.resource.ID == 1) {
                if (map.action.name.equals("CREATE")) {

                    this.requirePermissionMap.put(this.POST_METHOD + " " + "/transactions", map);
                } else if (map.action.name.equals("DISABLE"))
                    this.requirePermissionMap.put(this.PUT_METHOD + " /transactions/disable", map);
            }
            // Planning Resource
            else if (map.resource.ID == 2) {
                if (map.action.name.equals("CREATE"))
                    this.requirePermissionMap.put(this.POST_METHOD + " /plannings", map);
                else if (map.action.name.equals("UPDATE"))
                    this.requirePermissionMap.put(this.PUT_METHOD + " /plannings/(.*)", map);
                else if (map.action.name.equals("DELETE"))
                    this.requirePermissionMap.put(this.DELETE_METHOD + " /plannings/(.*)", map);
            }
            // Account Resource
            else if (map.resource.ID == 3) {
                if (map.action.name.equals("CREATE"))
                    this.requirePermissionMap.put(this.POST_METHOD + " /users", map);
                else if (map.action.name.equals("UPDATE")) {
                    this.requirePermissionMap.put(this.PUT_METHOD + " /users/role", map);
                    this.requirePermissionMap.put(this.PUT_METHOD + " /users/department", map);
                } else if (map.action.name.equals("DISABLE"))
                    this.requirePermissionMap.put(this.PUT_METHOD + " /users/disable", map);
            }
            // Role Resource
            else if (map.resource.ID == 4) {
                if (map.action.name.equals("READ")) {
                    this.requirePermissionMap.put(this.GET_METHOD + " /roles/permissions", map);
                    this.requirePermissionMap.put(this.GET_METHOD + " /roles/mapping", map);
                } else if (map.action.name.equals("UPDATE")) {
                    this.requirePermissionMap.put(this.PUT_METHOD + " /roles/name", map);
                    this.requirePermissionMap.put(this.PUT_METHOD + " /roles/permissions", map);
                }
            }
        }
        for (String key : this.requirePermissionMap.keySet()) {
            System.out.println("[" + key + "]" + " requires: "
                    + "[" + this.requirePermissionMap.get(key).action.name + "] "
                    + "[" + this.requirePermissionMap.get(key).resource.name + "]");
        }
    }

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler) throws IOException {

        ResourceActionMappingEntity requiredPermission = categorizeRequest(
                request.getMethod(), request.getRequestURI());

        // If the API request doesn't need permission
        if (requiredPermission == null)
            return true;

        UserToken token = (UserToken) request.getAttribute(CookieInterceptor.USER_TOKEN);
        String userId = token.getUserId();
        if (userId == null) {
            response.sendError(HttpStatus.UNPROCESSABLE_ENTITY.value(), this.USER_INVALID_MSG);
            return false;
        }
        UserEntity user = this.userRepository.findById(userId).orElse(null);
        if (user == null) {
            response.sendError(HttpStatus.UNPROCESSABLE_ENTITY.value(), this.USER_INVALID_MSG);
            return false;
        }

        ArrayList<PermissionEntity> userPermissions = permissionRepository.findByRoleId(user.getRole().ID);

        boolean isValidApiCall = false;
        for (PermissionEntity permission : userPermissions) {
            if (requiredPermission.resource.ID == permission.resource.ID
                    && requiredPermission.action.ID == permission.action.ID) {
                isValidApiCall = true;
                break;
            }
        }
        if (!isValidApiCall) {
            response.sendError(HttpStatus.FORBIDDEN.value(), this.FORBIDDEN_MSG);
        }
        return isValidApiCall;
    }

    private ResourceActionMappingEntity categorizeRequest(String method, String URL) {
        String api = method + " " + URL;
        Set<String> keys = this.requirePermissionMap.keySet();
        for (String key : keys) {
            if (api.matches(key)) {
                System.out.println(api + " matches " + key);
                return this.requirePermissionMap.get(key);
            }
        }
        return null;
    }
}
