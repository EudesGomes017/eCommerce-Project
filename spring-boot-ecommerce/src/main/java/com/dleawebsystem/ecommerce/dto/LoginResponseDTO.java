package com.dleawebsystem.ecommerce.dto;

public class LoginResponseDTO {
    private String token;
    private String userFullName;

    public LoginResponseDTO(String token, String userFullName) {
        this.token = token;
        this.userFullName = userFullName;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public String getUserFullName() {
        return userFullName;
    }
}

