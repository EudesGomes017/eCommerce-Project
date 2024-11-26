package com.dleawebsystem.ecommerce.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {


    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //sem guarda estado
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/api/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/products").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll() //wildcard ** para garantir que qualquer ID seja permitido.
                        .requestMatchers(HttpMethod.GET, "/api/product-category").permitAll()//QUAN-DO FOR FAZER UM POST NO ANDPOINT /api/clients SÓ QUEM VAI CRIAR É ADMIN
                        .requestMatchers(HttpMethod.POST, "/api/checkout/purchase").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/countries").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/states").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/states/search/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/orders").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/orders/search/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/register").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/products/search/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/orders/search/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/checkout/paymentintent").permitAll()
                        /*.requestMatchers("/api/user/**").hasRole("USER")*/
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                        .anyRequest().authenticated() // quando for as outros roles só vai autenticar
                )

                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager(); //pegando a instancia do autheticationManage do spring security
    }

    @Bean
    //criptografando a senha, toda vez que criar ele vai criptografar a senha no banco e quando logar ele vai comparar se a senha é igual
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
