package com.blucodes.unsoldly.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.blucodes.unsoldly.entity.ProductForSell;
import com.blucodes.unsoldly.entity.User;
import com.blucodes.unsoldly.repository.ProductForSaleRepository;
import com.blucodes.unsoldly.repository.UserRepository;
import com.blucodes.unsoldly.repository.impl.ProductForSaleRepositoryImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

class ProductForSellServiceTest {

    @Mock
    private ProductForSaleRepository productForSaleRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private GeolocationService geolocationService;

    @Mock
    private ProductForSaleRepositoryImpl productForSaleRepositoryImpl;

    @InjectMocks
    private ProductForSellService productForSellService;

    private ProductForSell product;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        product = new ProductForSell();
        product.setId(1); // Integer ID
        product.setCity("Test City");
        product.setState("Test State");
        product.setCountry("Test Country");
    }

    @Test
    void testGetAllProducts() {
        when(productForSaleRepository.findAll()).thenReturn(Arrays.asList(product));

        List<ProductForSell> products = productForSellService.getAllProducts();

        assertEquals(1, products.size());
        assertEquals("Test City", products.get(0).getCity());
    }

    @Test
    void testFindProductSaleById_Found() {
        when(productForSaleRepository.findById(1)).thenReturn(Optional.of(product));

        ProductForSell found = productForSellService.findProductSaleById(1);

        assertNotNull(found);
        assertEquals("Test City", found.getCity());
    }

    @Test
    void testFindProductSaleById_NotFound() {
        when(productForSaleRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(Exception.class, () -> {
            productForSellService.findProductSaleById(1);
        });
    }

    @Test
    void testDeleteProductById() {
        doNothing().when(productForSaleRepository).deleteById(1);

        productForSellService.deleteProductById(1);

        verify(productForSaleRepository, times(1)).deleteById(1);
    }

    @Test
    void testUpdateProduct() {
        when(productForSaleRepository.save(product)).thenReturn(product);

        ProductForSell updated = productForSellService.updateProduct(product);

        assertEquals("Test City", updated.getCity());
    }

    @Test
    void testSearchProducts() {
        when(productForSaleRepositoryImpl.searchProductForSale("test"))
                .thenReturn(Arrays.asList(product));

        List<ProductForSell> result = productForSellService.searchProducts("test");

        assertEquals(1, result.size());
        assertEquals("Test City", result.get(0).getCity());
    }
}
