package com.blucodes.unsoldly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blucodes.unsoldly.entity.ProductForSell;
import com.blucodes.unsoldly.service.ProductForSellService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class ProductForSaleController {
	
	@Autowired
	private ProductForSellService productForSellService;
	
	@GetMapping("/{username}/products-for-sell")
	public List<ProductForSell> getAllProductsByUser(@PathVariable("username") String username) {
		return productForSellService.getAllProductsByUser(username);
	}
	
	@GetMapping("/product-for-sale/{id}")
	public ProductForSell getProductSaleById(@PathVariable("id") int id) {
		return productForSellService.findProductSaleById(id);
	}

	@DeleteMapping("/product-for-sale/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id) {
		productForSellService.deleteProductById(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/product-for-sale/{id}")
	public ProductForSell update(@PathVariable("id") Integer id, @RequestBody ProductForSell product) {
		product.setId(id);
		return productForSellService.updateProduct(product);
	}

	@PostMapping("/{username}/product-for-sale")
	public ResponseEntity<?> create( @PathVariable("username") String username, @RequestBody ProductForSell product) {
		try {
			ProductForSell productForSell =  productForSellService.addProductFotSell(username, product);
			return new ResponseEntity<>(productForSell,HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("HttpClientErrorException {}", e.getLocalizedMessage());
			return new ResponseEntity<>(e.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/product-for-sale/search")
	public ResponseEntity<?> create( @RequestParam("param") String param) {
		try {
			List<ProductForSell> list =  productForSellService.searchProducts(param);
			return new ResponseEntity<>(list,HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("HttpClientErrorException {}", e.getLocalizedMessage());
			return new ResponseEntity<>(e.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
}
