package com.blucodes.unsoldly.controller;

import com.blucodes.unsoldly.entity.ProductForSell;
import com.blucodes.unsoldly.service.ProductForSellService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ProductForSaleControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ProductForSellService productForSellService;

    @InjectMocks
    private ProductForSaleController productForSaleController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(productForSaleController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void testGetAllProductsByUser() throws Exception {
        ProductForSell p1 = new ProductForSell();
        p1.setId(1);
        p1.setCity("New York");

        ProductForSell p2 = new ProductForSell();
        p2.setId(2);
        p2.setCity("Los Angeles");

        List<ProductForSell> products = Arrays.asList(p1, p2);

        when(productForSellService.getAllProductsByUser("testuser")).thenReturn(products);

        mockMvc.perform(get("/testuser/products-for-sell"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(products.size()))
                .andExpect(jsonPath("$[0].city").value("New York"));
    }

    @Test
    void testGetProductSaleById() throws Exception {
        ProductForSell product = new ProductForSell();
        product.setId(1);
        product.setCity("Chicago");

        when(productForSellService.findProductSaleById(1)).thenReturn(product);

        mockMvc.perform(get("/product-for-sale/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.city").value("Chicago"));
    }

    @Test
    void testCreateProductForSale() throws Exception {
        ProductForSell product = new ProductForSell();
        product.setId(1);
        product.setCity("Houston");

        when(productForSellService.addProductFotSell(eq("testuser"), any(ProductForSell.class)))
                .thenReturn(product);

        mockMvc.perform(post("/testuser/product-for-sale")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(product)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.city").value("Houston"));
    }

    @Test
    void testUpdateProductForSale() throws Exception {
        ProductForSell product = new ProductForSell();
        product.setId(1);
        product.setCity("San Diego");

        when(productForSellService.updateProduct(any(ProductForSell.class)))
                .thenReturn(product);

        mockMvc.perform(put("/product-for-sale/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(product)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.city").value("San Diego"));
    }

    @Test
    void testDeleteProductForSale() throws Exception {
        doNothing().when(productForSellService).deleteProductById(1);

        mockMvc.perform(delete("/product-for-sale/1"))
                .andExpect(status().isNoContent());

        verify(productForSellService, times(1)).deleteProductById(1);
    }

    @Test
    void testSearchProducts() throws Exception {
        ProductForSell product = new ProductForSell();
        product.setId(1);
        product.setCity("Miami");

        List<ProductForSell> products = Arrays.asList(product);

        when(productForSellService.searchProducts("miami")).thenReturn(products);

        mockMvc.perform(get("/product-for-sale/search")
                        .param("param", "miami"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].city").value("Miami"));
    }
}
