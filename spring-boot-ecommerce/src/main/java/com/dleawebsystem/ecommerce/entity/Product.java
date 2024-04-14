package com.dleawebsystem.ecommerce.entity;

import java.math.BigDecimal;
import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "product")
@Data
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private ProductCategory category;

	@Column(name = "sku")
	private String sku;

	@Column(name = "name")
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "uni_Price")
	private BigDecimal uniPrice;

	@Column(name = "image_Url")
	private String imageUrl;

	@Column(name = "active")
	private boolean active;

	@Column(name = "units_In_Stock")
	private int unitsInStock;

	@Column(name = "date_Created")
	@CreationTimestamp
	private Instant dateCreated;

	@Column(name = "last_Updated")
	@UpdateTimestamp
	private Instant lastUpdated;

}
