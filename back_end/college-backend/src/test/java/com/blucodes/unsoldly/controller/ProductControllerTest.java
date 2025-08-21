package com.blucodes.unsoldly.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.Collections;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.blucodes.unsoldly.entity.Company;
import com.blucodes.unsoldly.entity.Product;
import com.blucodes.unsoldly.entity.ProductCategory;
import com.blucodes.unsoldly.service.ProductService;

@WebMvcTest(controllers = ProductController.class, excludeAutoConfiguration = org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class)
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Test
    public void testGetAllProducts() throws Exception {
        Product p1 = new Product();
        p1.setId(1);
        p1.setProductName("Product A");

        Product p2 = new Product();
        p2.setId(2);
        p2.setProductName("Product B");

        Mockito.when(productService.getAllProducts()).thenReturn(new ArrayList<>(Arrays.asList(p1, p2)));

        mockMvc.perform(get("/products")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].productName").value("Product A"))
                .andExpect(jsonPath("$[1].productName").value("Product B"));
    }

    @Test
    public void testGetProductById() throws Exception {
        Product p = new Product();
        p.setId(1);
        p.setProductName("Product A");

        Mockito.when(productService.findProductById(1)).thenReturn(p);

        mockMvc.perform(get("/products/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productName").value("Product A"));
    }

    @Test
    public void testDeleteProduct() throws Exception {
        Mockito.doNothing().when(productService).deleteProductById(1);

        mockMvc.perform(delete("/products/1"))
                .andExpect(status().isNoContent());

        Mockito.verify(productService, Mockito.times(1)).deleteProductById(1);
    }

    @Test
    public void testUpdateProduct() throws Exception {
        Product updatedProduct = new Product();
        updatedProduct.setId(1);
        updatedProduct.setProductName("Updated Product");

        Mockito.when(productService.updateProduct(Mockito.any(Product.class))).thenReturn(updatedProduct);

        String json = """
        {
            "productName": "Updated Product"
        }
        """;

        mockMvc.perform(put("/products/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productName").value("Updated Product"));
    }

    @Test
    public void testCreateProduct() throws Exception {
        Product newProduct = new Product();
        newProduct.setId(1);
        newProduct.setProductName("New Product");

        Mockito.when(productService.addProduct(Mockito.any(Product.class))).thenReturn(newProduct);

        String json = """
        {
            "productName": "New Product"
        }
        """;

        mockMvc.perform(post("/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productName").value("New Product"));
    }
    
//    EXCEPTIONAL CASES
    
    @Test
    public void testGetProductById_NotFound() throws Exception {
        when(productService.findProductById(999)).thenReturn(null);

        mockMvc.perform(get("/products/999")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testFindByProductName_Empty() throws Exception {
        when(productService.findByProductName("NonExistingName")).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/products?name=NonExistingName")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    public void testCreateProduct_InvalidInput() throws Exception {
        String invalidJson = """
            {
                "productName": "",
                "productCode": "123"
            }
        """;

        mockMvc.perform(post("/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
                .andExpect(status().isBadRequest());
    }

}
