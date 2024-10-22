package com.dleawebsystem.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyAppConfig implements WebMvcConfigurer {

    @Value("${allowed.origins}")
    private String[] theAllowedOrigins;

    @Value("${spring.data.rest.base-path}")
    private String basePath;

    @Override
    public void addCorsMappings(CorsRegistry cors) {
        // Define a permissão de CORS para todas as rotas que seguem o caminho base definido em "spring.data.rest.base-path"
        cors.addMapping(basePath + "/**").allowedOrigins(theAllowedOrigins);

        // Chama a implementação padrão do método (não necessário aqui, mas não prejudica)
        WebMvcConfigurer.super.addCorsMappings(cors);
    }
}
