package com.dleawebsystem.ecommerce.service.auth;

import com.dleawebsystem.ecommerce.config.security.TokenService;
import com.dleawebsystem.ecommerce.dao.UserRepository;
import com.dleawebsystem.ecommerce.dto.LoginDto;
import com.dleawebsystem.ecommerce.dto.LoginResponseDTO;
import com.dleawebsystem.ecommerce.dto.RegisterDTO;
import com.dleawebsystem.ecommerce.entity.UserTypeEnum;
import com.dleawebsystem.ecommerce.entity.Users;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class Authorizationservice implements UserDetailsService {


    @Autowired
    private ApplicationContext applicationContext;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;


    private AuthenticationManager authenticationManager;


    @Override //metodo para consultar após o usuário fazer autenticação!
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return (UserDetails) userRepository.findByEmail(username);
    }

    public ResponseEntity<Object> login(@RequestBody @Valid LoginDto loginDto) {
        try {
            authenticationManager = applicationContext.getBean(AuthenticationManager.class);
            var usernamePassword = new UsernamePasswordAuthenticationToken(loginDto.email(), loginDto.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);


            Users authenticatedUser = (Users) auth.getPrincipal(); // Obtem o usuário autenticado
            var token = tokenService.genareteToken((Users) auth.getPrincipal());

            // Cria a resposta com token e userFullName
            LoginResponseDTO response = new LoginResponseDTO(token, authenticatedUser.getName()); // Use o método adequado para obter o nome completo


           // return ResponseEntity.ok(new LoginResponseDTO(token));
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            //TODO: QUANDO INICIAR AS EXCEPTION CUSTOMIZADAS VOLTAR AQUI
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Falha na autenticação: " + e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<Object> registerUser(@RequestBody RegisterDTO registerDTO) {
        try {
            if (this.userRepository.existsByEmail(registerDTO.email())) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Falha ao cadastrar usuário: " + "Erro ao tentar cadastrar usuário. Entre em contato com o administrador!");
            }

            // Criptografa a senha
            String encryptedPassword = new BCryptPasswordEncoder().encode(registerDTO.password());

            // Cria um novo usuário com a senha criptografada
            Users newUser = new Users(registerDTO.email(), encryptedPassword, UserTypeEnum.ADMIN, registerDTO.name());

            // Salva o novo usuário no repositório
            this.userRepository.save(newUser);

            return ResponseEntity.ok(String.format("Usuário '%s' cadastrado com sucesso", registerDTO.email()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Falha ao cadastrar Usuário: " + "Erro ao tentar cadastrar Usuário. Entre em contato com o administrador!");
        }
    }


}
