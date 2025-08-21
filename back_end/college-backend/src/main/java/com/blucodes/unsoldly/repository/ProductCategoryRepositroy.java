package com.blucodes.unsoldly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blucodes.unsoldly.entity.ProductCategory;

@Repository
public interface ProductCategoryRepositroy extends JpaRepository<ProductCategory, Integer>{
	List<ProductCategory> findByCategoryName(String categoryName);
	List<ProductCategory> findByCategoryCode(String categoryCode);
}

