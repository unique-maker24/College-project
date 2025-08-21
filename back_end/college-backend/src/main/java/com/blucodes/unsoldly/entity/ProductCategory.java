package com.blucodes.unsoldly.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductCategory {

	@Id
	@GeneratedValue
	private Integer id;
	
	@Column(unique = true)
	private String categoryCode;
	
	private String categoryName;

	
}
