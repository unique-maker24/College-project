package com.blucodes.unsoldly.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blucodes.unsoldly.entity.Company;
import com.blucodes.unsoldly.entity.Product;
import com.blucodes.unsoldly.entity.ProductCategory;
import com.blucodes.unsoldly.repository.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	
	public List<Product> findByProductName(String productName){
		return productRepository.findByProductName(productName);
	}

	public List<Product> findByProductCode(String productCode){
		return productRepository.findByProductCode(productCode);
	}
	
	public List<Product> findByProductCategory(ProductCategory productCategory){
		return productRepository.findByProductCategory(productCategory);
	}
	
	public List<Product> findByCompany(Company company){
		return productRepository.findByCompany(company);
	}
	
	public Product addProduct(Product product) {
		Product newProduct = productRepository.save(product);
		return newProduct;
	}
	
	public void deleteProductById(int id) {
		productRepository.deleteById(id);
	}

	public Product findProductById(int id) {
		Product product = productRepository.findById(id).get();
		return product;
	}

	public Product updateProduct(Product product) {
		return productRepository.save(product);
	}
	
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}
}