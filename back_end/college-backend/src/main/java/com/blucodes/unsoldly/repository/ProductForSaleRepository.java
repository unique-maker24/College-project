package com.blucodes.unsoldly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blucodes.unsoldly.entity.Product;
import com.blucodes.unsoldly.entity.ProductForSell;
import com.blucodes.unsoldly.entity.User;

@Repository
public interface ProductForSaleRepository extends JpaRepository<ProductForSell, Integer>{
	List<ProductForSell> findByProduct(Product product);
	List<ProductForSell> findByUser(User user);
}

