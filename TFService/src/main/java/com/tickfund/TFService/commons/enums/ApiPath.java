package com.tickfund.TFService.commons.enums;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

// Stuck in deal with path variable

class ApiBasePath {
    public static final String ATTACHMENTS = "/attachments";
    public static final String AUTH = "/auth";
    public static final String CATEGORIES = "/categories";
    public static final String PERSONAL = "/personal";
    public static final String PLANNINGS = "/plannings";
    public static final String ROLES = "/roles";
    public static final String STATISTICS = "/stat";
    public static final String TRANSACTIONS = "/transactions";
    public static final String USERS = "/users";
} 

public enum ApiPath {
    GET_ATTACHMENT(ApiBasePath.ATTACHMENTS ,"{id}"),
    POST_ATTACHMENT(ApiBasePath.ATTACHMENTS, "/upload"),

    GET_ALREADY_LOGIN(ApiBasePath.AUTH, "/login"),
    GET_AUTH_CODE(ApiBasePath.AUTH, "/ticksso"),

    GET_CATEGORIES(ApiBasePath.CATEGORIES, ""),
    POST_CATEGORIES(ApiBasePath.CATEGORIES, ""),
    DELETE_CATEGORIES(ApiBasePath.CATEGORIES, "{name}"),
    PUT_CATEGORIES(ApiBasePath.CATEGORIES, "{name}"),

    GET_PERSONAL(ApiBasePath.PERSONAL, ""),

    GET_PLANNINGS(ApiBasePath.PLANNINGS, "/query"),
    GET_PLANNING_BY_ID(ApiBasePath.PLANNINGS, "/{id}"),
    PUT_PLANNING_BY_ID(ApiBasePath.PLANNINGS, "/{id}"),
    POST_PLANNING_BY_ID(ApiBasePath.PLANNINGS, ""),
    DELETE_PLANNING_BY_ID(ApiBasePath.PLANNINGS, "/{id}"),

    GET_ROLES(ApiBasePath.ROLES, ""),
    GET_ROLES_WITH_PERMISSIONS(ApiBasePath.ROLES, "/permissions"),
    PUT_PERMISSIONS(ApiBasePath.ROLES, "/permissions"),
    GET_RESOURCE_ACTION_MAPPING(ApiBasePath.ROLES, "/mapping"),
    PUT_ROLE_NAME(ApiBasePath.ROLES, "/name"),

    GET_STATISTICS(ApiBasePath.STATISTICS, ""),

    GET_TRANSACTIONS(ApiBasePath.TRANSACTIONS, "/query"),
    GET_TRANSACTION_BY_ID(ApiBasePath.TRANSACTIONS, "/{id}"),
    POST_TRANSACTIONS(ApiBasePath.TRANSACTIONS, ""),

    GET_USERS(ApiBasePath.USERS, ""),
    GET_USER_BY_ID(ApiBasePath.USERS, "{/id}"),
    PUT_USER_ROLE(ApiBasePath.USERS, "/role"),
    PUT_USER_DEPARTMENT(ApiBasePath.USERS, "/department"),
    PUT_USER_ACTIVE(ApiBasePath.USERS, "/active"),
    POST_USER(ApiBasePath.USERS, "");

    @JsonProperty
    private final String path;

    ApiPath(String basePath, String path) {
        this.path = basePath + path;
    }

    @JsonValue
    public String getValue() {
        return this.path;
    }

    @JsonValue
    public final String getRegex() {
        if(!this.path.contains("{"))
            return this.path;
        return this.path.replaceAll("\\{(.*?)\\}", "(.*)");
    }
}
