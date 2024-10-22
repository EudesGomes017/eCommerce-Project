package com.dleawebsystem.ecommerce.config.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.dleawebsystem.ecommerce.entity.Users;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {


    private String secret = "3a4056d58854bcb7b0e637fb7b0d3b87"; // NÃO recomendado
    // O segredo compartilhado
    public String genareteToken(Users user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            String token = JWT.create()
                    .withIssuer("auth") // quem é o emissor
                    .withSubject(user.getUsername()) // usuário que recebe o token
                    .withExpiresAt(genExpirationDate())  // Token expira em 15 minutos
                    .sign(algorithm); // faz a assinatura e geração final

            return token;

        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro while generating token" + e);
        }
    }

    // Método para validar token JWT
    public String validateToken(String token) {
        try {

            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.require(algorithm)
                    .withIssuer("auth")
                    .build()
                    .verify(token) // descriptogrando o token
                    .getSubject(); // pegando o token que salvamos dentro do getSubject


        } catch (JWTCreationException e) {
            throw new RuntimeException("Invalid token", e);
        }

    }

    public Instant genExpirationDate() {
        return LocalDateTime.now().plusHours(12).toInstant(ZoneOffset.of("-03:00"));
    }
}
