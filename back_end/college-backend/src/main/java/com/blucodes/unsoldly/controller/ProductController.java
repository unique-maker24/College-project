package com.blucodes.unsoldly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blucodes.unsoldly.entity.Product;
import com.blucodes.unsoldly.service.ProductService;


@RestController
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@GetMapping("/products")
	public List<Product> getProducts() {
		return productService.getAllProducts();
	}
	
	@GetMapping("/products/{id}")
	public Product getProductById(@PathVariable("id") int id) {
		return productService.findProductById(id);
	}

	@DeleteMapping("/products/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id) {
		productService.deleteProductById(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/products/{id}")
	public Product update(@PathVariable("id") Integer id, @RequestBody Product product) {
		product.setId(id);
		return productService.updateProduct(product);
	}

	@PostMapping("/products")
	public Product create( @RequestBody Product product) {
		return productService.addProduct(product);
	}

}
