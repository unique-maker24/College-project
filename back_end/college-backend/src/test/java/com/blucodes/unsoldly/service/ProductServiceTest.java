package com.blucodes.unsoldly.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.blucodes.unsoldly.entity.Company;
import com.blucodes.unsoldly.entity.Product;
import com.blucodes.unsoldly.entity.ProductCategory;
import com.blucodes.unsoldly.repository.ProductRepository;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void testFindByProductName() {
        Product p = new Product();
        p.setProductName("Test Product");

        when(productRepository.findByProductName("Test Product")).thenReturn(Arrays.asList(p));

        List<Product> result = productService.findByProductName("Test Product");
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Product", result.get(0).getProductName());

        verify(productRepository, times(1)).findByProductName("Test Product");
    }

    @Test
    void testFindByProductCode() {
        Product p = new Product();
        p.setProductCode("P123");

        when(productRepository.findByProductCode("P123")).thenReturn(Arrays.asList(p));

        List<Product> result = productService.findByProductCode("P123");
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("P123", result.get(0).getProductCode());

        verify(productRepository, times(1)).findByProductCode("P123");
    }

    @Test
    void testFindByProductCategory() {
        ProductCategory category = new ProductCategory();
        category.setId(1);

        Product p = new Product();
        p.setProductCategory(category);

        when(productRepository.findByProductCategory(category)).thenReturn(Arrays.asList(p));

        List<Product> result = productService.findByProductCategory(category);
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(category, result.get(0).getProductCategory());

        verify(productRepository, times(1)).findByProductCategory(category);
    }

    @Test
    void testFindByCompany() {
        Company company = new Company();
        company.setId(1);

        Product p = new Product();
        p.setCompany(company);

        when(productRepository.findByCompany(company)).thenReturn(Arrays.asList(p));

        List<Product> result = productService.findByCompany(company);
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(company, result.get(0).getCompany());

        verify(productRepository, times(1)).findByCompany(company);
    }

    @Test
    void testAddProduct() {
        Product product = new Product();
        product.setProductName("New Product");

        when(productRepository.save(product)).thenReturn(product);

        Product result = productService.addProduct(product);
        assertEquals("New Product", result.getProductName());

        verify(productRepository, times(1)).save(product);
    }

    @Test
    void testDeleteProductById() {
        doNothing().when(productRepository).deleteById(1);

        productService.deleteProductById(1);

        verify(productRepository, times(1)).deleteById(1);
    }

    @Test
    void testFindProductById() {
        Product product = new Product();
        product.setId(1);

        when(productRepository.findById(1)).thenReturn(Optional.of(product));

        Product result = productService.findProductById(1);
        assertEquals(1, result.getId());

        verify(productRepository, times(1)).findById(1);
    }

    @Test
    void testUpdateProduct() {
        Product product = new Product();
        product.setId(1);
        product.setProductName("Updated Product");

        when(productRepository.save(product)).thenReturn(product);

        Product result = productService.updateProduct(product);
        assertEquals("Updated Product", result.getProductName());

        verify(productRepository, times(1)).save(product);
    }

    @Test
    void testGetAllProducts() {
        Product p1 = new Product();
        Product p2 = new Product();

        when(productRepository.findAll()).thenReturn(Arrays.asList(p1, p2));

        List<Product> result = productService.getAllProducts();
        assertEquals(2, result.size());

        verify(productRepository, times(1)).findAll();
    }
    
    
//    EXCEPTION CASES
    
    @Test
    void testFindProductById_NotFound() {
        when(productRepository.findById(999)).thenReturn(Optional.empty());

        // This depends on your service behavior — if it throws or returns null
        Product result = productService.findProductById(999);
        assertNull(result, "Product should be null when not found");
    }

    @Test
    void testFindByProductName_EmptyList() {
        when(productRepository.findByProductName("NonExistingName")).thenReturn(Collections.emptyList());

        List<Product> result = productService.findByProductName("NonExistingName");
        assertTrue(result.isEmpty(), "Should return empty list when no products found");
    }

}
