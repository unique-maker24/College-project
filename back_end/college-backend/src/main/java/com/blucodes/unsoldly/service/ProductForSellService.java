package com.blucodes.unsoldly.service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blucodes.unsoldly.entity.Geolocation;
import com.blucodes.unsoldly.entity.ProductForSell;
import com.blucodes.unsoldly.entity.User;
import com.blucodes.unsoldly.repository.ProductForSaleRepository;
import com.blucodes.unsoldly.repository.UserRepository;
import com.blucodes.unsoldly.repository.impl.ProductForSaleRepositoryImpl;

@Service
public class ProductForSellService {
	
	@Autowired
	private ProductForSaleRepository proForSaleRepository;
	
	@Autowired
	private UserRepository userRepositroy;
	
	@Autowired
	private GeolocationService geolocationService;
	
	@Autowired
	private ProductForSaleRepositoryImpl productForSaleRepositoryImpl;

	public ProductForSell addProductFotSell(String username, ProductForSell product) throws Exception {
		User user = userRepositroy.findByEmail(username);
		product.setUser(user);
		String addressLine1 = Optional.ofNullable(product.getAddressLine1()).orElse("").trim();
		String addressLine2 = Optional.ofNullable(product.getAddressLine2()).orElse("").trim();
		String city = Optional.ofNullable(product.getCity()).orElse("").trim();
		String state = Optional.ofNullable(product.getState()).orElse("").trim();
		String country = Optional.ofNullable(product.getCountry()).orElse("").trim();
		String fullAddress = Stream.of(
				//addressLine1,
				//addressLine2,
				city,
				state,
				country
		    )
		    .filter(s -> s != "" && !s.trim().isEmpty())
		    .collect(Collectors.joining(","));
		
		Geolocation geolocation = geolocationService.getLatLongFromAddress(fullAddress);
		if(geolocation!=null) {	
			product.setLatitude(geolocation.getLatitude());
			product.setLongitude(geolocation.getLongitude());
		}
		
		ProductForSell newProduct = proForSaleRepository.save(product);
		return newProduct;
	}
	
	public void deleteProductById(int id) {
		proForSaleRepository.deleteById(id);
	}

	public ProductForSell findProductSaleById(int id) {
		ProductForSell product = proForSaleRepository.findById(id).get();
		return product;
	}

	public ProductForSell updateProduct(ProductForSell product) {
		return proForSaleRepository.save(product);
	}
	
	public List<ProductForSell> getAllProductsByUser(String username) {
		User user = userRepositroy.findByEmail(username);
		return proForSaleRepository.findByUser(user);
	}
	
	public List<ProductForSell> getAllProducts() {
		return proForSaleRepository.findAll();
	}
	
	public List<ProductForSell> searchProducts(String searchParam){
		return productForSaleRepositoryImpl.searchProductForSale(searchParam);
	}
	
}