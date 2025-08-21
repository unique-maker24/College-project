package com.blucodes.unsoldly.repository.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.blucodes.unsoldly.entity.Company;
import com.blucodes.unsoldly.entity.Product;
import com.blucodes.unsoldly.entity.ProductForSell;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Repository
public class ProductForSaleRepositoryImpl {
	@PersistenceContext
	private EntityManager entityManager;

	public List<ProductForSell> searchProductForSale(String searchParam) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<ProductForSell> query = cb.createQuery(ProductForSell.class);
		Root<ProductForSell> productForSell = query.from(ProductForSell.class);
		Join<ProductForSell, Product> product = productForSell.join("product");
		Join<Product, Company> company = product.join("company");

		List<Predicate> predicates = new ArrayList();
		if (searchParam != null && !searchParam.isEmpty()) {
			System.out.println("searchParam   "+searchParam);
			String[] searchWords = searchParam.split("\\s+");
			
			for (String word : searchWords) {
				System.out.println("searchWords   "+word);
				if (word != null && !word.isEmpty()) {
					String likePattern = "%" + word + "%";

					// Add predicates for each field to be searched
					predicates.add(cb.like(company.get("companyName"), likePattern));
					predicates.add(cb.like(product.get("productName"), likePattern));
					predicates.add(cb.like(product.get("productCode"), likePattern));
					predicates.add(cb.like(productForSell.get("city"), likePattern));
					predicates.add(cb.like(productForSell.get("state"), likePattern));
					predicates.add(cb.like(productForSell.get("country"), likePattern));
				}
			}
		}
		query.select(productForSell).where(cb.or(predicates.toArray(new Predicate[0])));

		return entityManager.createQuery(query).getResultList();
	}
}
