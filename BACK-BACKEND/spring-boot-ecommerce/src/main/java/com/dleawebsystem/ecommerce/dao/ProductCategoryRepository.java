package com.dleawebsystem.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.dleawebsystem.ecommerce.entity.ProductCategory;
import com.dleawebsystem.ecommerce.interfac.InlineCategoryProjection;


@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productRepository", path = "product-category", 
excerptProjection = InlineCategoryProjection.class)
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}
