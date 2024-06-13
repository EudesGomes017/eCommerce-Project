package com.dleawebsystem.ecommerce.entity;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product_category")
// @Data == know bug
@Getter
@Setter
@EqualsAndHashCode
public class ProductCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "category_name")
	private String categoreName;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
	private Set<Product> products;
	

}