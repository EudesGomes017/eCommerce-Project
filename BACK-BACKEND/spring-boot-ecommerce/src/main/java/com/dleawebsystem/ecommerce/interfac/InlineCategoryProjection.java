package com.dleawebsystem.ecommerce.interfac;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

import com.dleawebsystem.ecommerce.entity.Product;
import com.dleawebsystem.ecommerce.entity.ProductCategory;

@Projection(name = "inlineCategory", types = { ProductCategory.class })
public interface InlineCategoryProjection {

	Long getId();

	String getCategoreName();
	
	Set<Product> getProducts();
}
