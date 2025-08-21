package com.blucodes.unsoldly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blucodes.unsoldly.entity.Company;
import com.blucodes.unsoldly.entity.Product;
import com.blucodes.unsoldly.entity.ProductCategory;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{
	List<Product> findByProductName(String productName);
	List<Product> findByProductCode(String productCode);
	List<Product> findByCompany(Company company);
	List<Product> findByProductCategory(ProductCategory productCategory);
}

