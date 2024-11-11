package com.dleawebsystem.ecommerce.controller;

import com.dleawebsystem.ecommerce.dto.LoginDto;
import com.dleawebsystem.ecommerce.dto.RegisterDTO;
import com.dleawebsystem.ecommerce.service.auth.Authorizationservice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "https://localhost:4200")
@RestController
@RequestMapping("/api")
public class AuthenticationController {

    @Autowired
    private Authorizationservice authorizationservice;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @Valid LoginDto loginDTO) {
        return authorizationservice.login(loginDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody @Valid RegisterDTO registerDTO) {
        return authorizationservice.registerUser(registerDTO);
    }

}
