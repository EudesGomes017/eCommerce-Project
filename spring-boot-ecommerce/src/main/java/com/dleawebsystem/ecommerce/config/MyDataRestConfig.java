package com.dleawebsystem.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.dleawebsystem.ecommerce.entity.Product;
import com.dleawebsystem.ecommerce.entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		
		HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
		
	 config.getExposureConfiguration()
	 		.forDomainType(Product.class)
	 		.withItemExposure( (metdata, httpmethods)  -> httpmethods.disable(theUnsupportedActions))
	 		.withCollectionExposure((metdata, httpmethods) -> httpmethods.disable(theUnsupportedActions));
	 
	 
	 
	 
	 config.getExposureConfiguration()
		.forDomainType(ProductCategory.class)
		.withItemExposure( (metdata, httpmethods)  -> httpmethods.disable(theUnsupportedActions))
		.withCollectionExposure((metdata, httpmethods) -> httpmethods.disable(theUnsupportedActions));
	}

}
