package com.dleawebsystem.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.dleawebsystem.ecommerce.entity.Country;
import com.dleawebsystem.ecommerce.entity.State;
import jdk.jfr.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.dleawebsystem.ecommerce.entity.Product;
import com.dleawebsystem.ecommerce.entity.ProductCategory;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // disable HTTP methods for ProductCategory: PUT, POST and DELETE
        dissableHttpMethods(Product.class, config, theUnsupportedActions);
        dissableHttpMethods(ProductCategory.class, config, theUnsupportedActions);
        dissableHttpMethods(Country.class, config, theUnsupportedActions);
        dissableHttpMethods(State.class, config, theUnsupportedActions);

        // call an internal helper method
        exposeIds(config);
    }

    private static void dissableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration().forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }


    private void exposeIds(RepositoryRestConfiguration config) {

        // expose entity ids
        //

        // - get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // - create an array of the entity types
        List<Class> entityClasses = new ArrayList<>();

        // - get the entity types for the entities
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // - expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
















/*Vamos fazer uma análise detalhada da configuração personalizada da API REST usando Spring Data REST que você forneceu. O código apresentado configura como o Spring Data REST expõe e manipula os dados das entidades em uma aplicação.

1. Introdução
O código é uma implementação de uma configuração personalizada para o Spring Data REST. Esta configuração é feita através da interface RepositoryRestConfigurer, que permite ajustar a configuração padrão do Spring Data REST, como expor IDs das entidades e desabilitar certos métodos HTTP.

2. Estrutura da Classe
2.1. A Classe MyDataRestConfig
java
Copiar código
public class MyDataRestConfig implements RepositoryRestConfigurer {
    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }
}
EntityManager: É uma instância de EntityManager injetada pelo Spring. Ela é usada para interagir com o contexto de persistência e obter metadados das entidades.

Construtor: O construtor da classe é anotado com @Autowired, indicando que o Spring deve injetar uma instância de EntityManager quando criar um objeto dessa classe.

2.2. Método configureRepositoryRestConfiguration
java
Copiar código
@Override
public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
    HttpMethod[] theUnsupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE };

    // disable HTTP methods for ProductCategory: PUT, POST and DELETE
    dissableHttpMethods(ProductCategory.class, config, theUnsupportedActions);
    dissableHttpMethods(Product.class, config, theUnsupportedActions);
    dissableHttpMethods(Country.class, config, theUnsupportedActions);
    dissableHttpMethods(State.class, config, theUnsupportedActions);

    // call an internal helper method
    exposeIds(config);
}
Objetivo: Este método é usado para configurar a exposição da API REST, ajustando quais métodos HTTP são permitidos para quais entidades e expondo os IDs das entidades.

Desabilitação de Métodos HTTP: Define um array theUnsupportedActions com métodos HTTP que não são permitidos (PUT, POST, DELETE). Em seguida, chama o método dissableHttpMethods para cada entidade, desabilitando esses métodos.

Exposição dos IDs: Após desabilitar os métodos HTTP, chama o método exposeIds para expor os IDs das entidades nas respostas da API.

2.3. Método dissableHttpMethods
java
Copiar código
private static void dissableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
    config.getExposureConfiguration().forDomainType(theClass)
            .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
            .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
}
Objetivo: Desabilita métodos HTTP específicos para uma determinada entidade.

Configuração de Exposição: Usa o método getExposureConfiguration().forDomainType(theClass) para obter a configuração de exposição para a entidade especificada. Em seguida, desabilita os métodos HTTP para a entidade com withItemExposure e withCollectionExposure.

2.4. Método exposeIds
java
Copiar código
private void exposeIds(RepositoryRestConfiguration config) {
    // expose entity ids
    Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
    List<Class> entityClasses = new ArrayList<>();
    for (EntityType tempEntityType : entities) {
        entityClasses.add(tempEntityType.getJavaType());
    }
    Class[] domainTypes = entityClasses.toArray(new Class[0]);
    config.exposeIdsFor(domainTypes);
}
Objetivo: Expor os IDs das entidades na API REST.

Obtenção das Entidades: Obtém um conjunto de todas as entidades do contexto de persistência através do EntityManager.

Criação da Lista de Classes de Entidades: Converte o conjunto de entidades em uma lista de classes (entityClasses).

Exposição dos IDs: Usa o método exposeIdsFor da RepositoryRestConfiguration para expor os IDs das entidades na API REST.

3. Conclusão
Essa configuração personalizada permite um controle mais detalhado sobre a API REST gerada pelo Spring Data REST:

Métodos HTTP: Restringe os métodos HTTP permitidos para certas entidades, impedindo operações como criação, atualização e exclusão.
IDs das Entidades: Exibe os IDs das entidades nas respostas da API, o que pode ser útil para o front-end ou outras partes da aplicação que precisam desses identificadores.
Este nível de configuração é útil quando se deseja um controle mais granular sobre como a API REST se comporta, além das configurações padrão fornecidas pelo Spring Data REST.*/