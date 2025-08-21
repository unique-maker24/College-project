package com.blucodes.unsoldly.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="product_for_sale")
public class ProductForSell {

	@Id
	@GeneratedValue
	private Integer id;
	private Integer quantity;
	private Float unitPrice;
	private String currency;
	private Float discount;
	private String addressLine1;
	private String addressLine2;
	private String city;
	private String state;
	private String country;
	private String postalCode;
	private Double latitude;
	private Double longitude;
	
	@ManyToOne
	private Product product;
	
	@ManyToOne
	private User user;

	
}
