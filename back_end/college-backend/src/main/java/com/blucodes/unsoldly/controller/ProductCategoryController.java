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

import com.blucodes.unsoldly.entity.ProductCategory;
import com.blucodes.unsoldly.service.ProductCategoryService;


@RestController
public class ProductCategoryController {
	
	@Autowired
	private ProductCategoryService productCategoryService;
	
	@GetMapping("/categories")
	public List<ProductCategory> getAllCate() {
		return productCategoryService.getAllProductCategories();
	}
	
	@GetMapping("/categories/{id}")
	public ProductCategory getCompanyById(@PathVariable("id") int id) {
		return productCategoryService.findProductCategoryById(id);
	}

	@DeleteMapping("/categories/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id) {
		productCategoryService.deleteProductCategoryById(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/categories/{id}")
	public ProductCategory update(@PathVariable("id") Integer id, @RequestBody ProductCategory productCategory) {
		productCategory.setId(id);
		return productCategoryService.updateProductCategory(productCategory);
	}

	@PostMapping("/categories")
	public ProductCategory create( @RequestBody ProductCategory productCategory) {
		return productCategoryService.addProductCategory(productCategory);
	}

}
