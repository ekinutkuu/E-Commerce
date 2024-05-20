package com.user_management.model;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Role {
    ADMIN,
    USER;

    @JsonCreator
    public static Role fromString(String role) {
        return Role.valueOf(role.toUpperCase());
    }

    public String toValue() {
        return this.name();
    }
}
