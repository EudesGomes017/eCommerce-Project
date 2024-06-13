package com.dleawebsystem.ecommerce.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.dleawebsystem.ecommerce.entity.Product;
import com.dleawebsystem.ecommerce.interfac.InlineProduct;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(excerptProjection = InlineProduct.class)
public interface ProductRepository extends JpaRepository<Product, Long> {

	Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

	/*
	 * Select * FROM Product ´wherp.name LIKR CONCAT('%', :name , '%') ele está
	 * fazendo essa busca com esse meto > findByNameontaining
	 */
	Page<Product> findByNameContaining(@Param("name") String name, Pageable page);

}
