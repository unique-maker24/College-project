package com.blucodes.unsoldly.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blucodes.unsoldly.entity.ProductCategory;
import com.blucodes.unsoldly.repository.ProductCategoryRepositroy;

@Service
public class ProductCategoryService {
	
	@Autowired
	private ProductCategoryRepositroy productCategoryRepositroy;
	
	
	public List<ProductCategory> findByCategoryName(String categoryName){
		return productCategoryRepositroy.findByCategoryName(categoryName);
	}
	
	public List<ProductCategory> findByCategoryCode(String categoryCode){
		return productCategoryRepositroy.findByCategoryCode(categoryCode);
	}
	
	public ProductCategory addProductCategory(ProductCategory productCategory) {
		ProductCategory newCategory = productCategoryRepositroy.save(productCategory);
		return newCategory;
	}
	
	public void deleteProductCategoryById(int id) {
		productCategoryRepositroy.deleteById(id);
	}

	public ProductCategory findProductCategoryById(int id) {
		ProductCategory productCategory = productCategoryRepositroy.findById(id).get();
		return productCategory;
	}

	public ProductCategory updateProductCategory(ProductCategory productCategory) {
		return productCategoryRepositroy.save(productCategory);
	}
	
	public List<ProductCategory> getAllProductCategories(){
		return productCategoryRepositroy.findAll();
	}
}