package com.dleawebsystem.ecommerce.interfac;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.data.rest.core.config.Projection;

import com.dleawebsystem.ecommerce.entity.Product;
import com.dleawebsystem.ecommerce.entity.ProductCategory;

@Projection(name = "inlineCategory", types = { Product.class })
public interface InlineProduct {

	Long getId();
    String getSku();
    String getName();
    String getDescription();
    BigDecimal getUnitPrice();
    String getImageUrl();
    boolean isActive();
    int getUnitsInStock();
    Date getDateCreated();
    Date getLastUpdated();
    ProductCategory getCategory();
} 