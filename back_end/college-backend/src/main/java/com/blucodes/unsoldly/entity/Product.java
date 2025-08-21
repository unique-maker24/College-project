package com.blucodes.unsoldly.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

	@Id
	@GeneratedValue
	private Integer id;
	private String productName;
	
	@Column(unique = true)
	private String productCode;
	
	@ManyToOne
	private ProductCategory productCategory;
	
	@ManyToOne
	private Company company;
	private String productDesc;
	
}
