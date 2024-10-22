package com.dleawebsystem.ecommerce.dto;

import com.dleawebsystem.ecommerce.entity.UserTypeEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterDTO(

        @NotBlank String email,
        @NotBlank String name,
        @NotBlank String password,
        @NotNull UserTypeEnum userTypeEnum) {
}

