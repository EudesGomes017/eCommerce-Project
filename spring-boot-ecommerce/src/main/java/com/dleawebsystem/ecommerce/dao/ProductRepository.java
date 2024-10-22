package com.dleawebsystem.ecommerce.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.dleawebsystem.ecommerce.entity.Product;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {

	Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

	/*
	 * Select * FROM Product ´wherp.name LIKR CONCAT('%', :name , '%') ele está
	 * fazendo essa busca com esse meto > findByNameontaining
	 */

	Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);


}

/*
 * O método findByNameContaining que você mencionou parece ser um método de
 * consulta de um repositório em um sistema que utiliza o Spring Data JPA. Vamos
 * explicar o que cada parte desse método significa:
 * 
 * Page<Product>: Indica que o método retorna uma lista paginada de entidades do
 * tipo Product. Page é uma interface do Spring Data que representa uma lista de
 * resultados paginada, permitindo fácil navegação pelos resultados e suporte
 * para paginação.
 * 
 * findByNameContaining: Este é o nome do método de consulta. No Spring Data
 * JPA, os nomes dos métodos de consulta são interpretados para criar consultas
 * SQL ou HQL (Hibernate Query Language) automaticamente, com base nas
 * convenções de nomenclatura.
 * 
 * @Param("name") String name: Este parâmetro indica que o método espera um
 * parâmetro chamado name do tipo String. Esse parâmetro é usado como critério
 * de filtro para buscar entidades Product cujo nome contenha o valorWQQW
 * especificado.
 * 
 * Pageable pageable: O parâmetro Pageable é usado para controlar a paginação e
 * a ordenação dos resultados da consulta. Ele permite especificar o número da
 * página desejada, o tamanho da página (quantidade de resultados por página) e
 * opcionalmente a ordenação dos resultados.
 * 
 * Resumindo, o método findByNameContaining é utilizado para buscar produtos
 * cujo nome contenha uma determinada substring (name). A resposta será uma
 * página de objetos Product, conforme especificado pelo parâmetro Pageable.
 * 
 * Exemplo de uso desse método poderia ser algo como:
 * 
 * java Copiar código Page<Product> productsPage =
 * productRepository.findByNameContaining("termoDeBusca", PageRequest.of(0,
 * 10)); Neste exemplo:
 * 
 * "termoDeBusca" é o valor que será procurado dentro dos nomes dos produtos.
 * PageRequest.of(0, 10) cria um objeto PageRequest indicando que queremos a
 * primeira página (página 0) com 10 resultados por página. Isso retornaria uma
 * Page<Product> contendo os primeiros 10 produtos cujos nomes contenham
 * "termoDeBusca".
 */
