package com.blucodes.unsoldly.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.Arrays;
import java.util.ArrayList;

import com.blucodes.unsoldly.entity.ProductCategory;
import com.blucodes.unsoldly.service.ProductCategoryService;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = ProductCategoryController.class,
    excludeAutoConfiguration = org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class)
public class ProductCategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductCategoryService productCategoryService;

    @Test
    public void testGetAllCategories() throws Exception {
        ProductCategory cat1 = new ProductCategory();
        cat1.setId(1);
        cat1.setCategoryName("Category A");

        ProductCategory cat2 = new ProductCategory();
        cat2.setId(2);
        cat2.setCategoryName("Category B");

        when(productCategoryService.getAllProductCategories()).thenReturn(new ArrayList<>(Arrays.asList(cat1, cat2)));

        mockMvc.perform(get("/categories")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].categoryName").value("Category A"))
                .andExpect(jsonPath("$[1].categoryName").value("Category B"));
    }

    @Test
    public void testGetCategoryById() throws Exception {
        ProductCategory cat = new ProductCategory();
        cat.setId(1);
        cat.setCategoryName("Category A");

        when(productCategoryService.findProductCategoryById(1)).thenReturn(cat);

        mockMvc.perform(get("/categories/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.categoryName").value("Category A"));
    }

    @Test
    public void testDeleteCategory() throws Exception {
        doNothing().when(productCategoryService).deleteProductCategoryById(1);

        mockMvc.perform(delete("/categories/1"))
                .andExpect(status().isNoContent());

        verify(productCategoryService, Mockito.times(1)).deleteProductCategoryById(1);
    }

    @Test
    public void testUpdateCategory() throws Exception {
        ProductCategory updatedCategory = new ProductCategory();
        updatedCategory.setId(1);
        updatedCategory.setCategoryName("Updated Category");

        when(productCategoryService.updateProductCategory(Mockito.any(ProductCategory.class))).thenReturn(updatedCategory);

        String json = """
        {
            "categoryName": "Updated Category"
        }
        """;

        mockMvc.perform(put("/categories/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.categoryName").value("Updated Category"));
    }

    @Test
    public void testCreateCategory() throws Exception {
        ProductCategory newCategory = new ProductCategory();
        newCategory.setId(1);
        newCategory.setCategoryName("New Category");

        when(productCategoryService.addProductCategory(Mockito.any(ProductCategory.class))).thenReturn(newCategory);

        String json = """
        {
            "categoryName": "New Category"
        }
        """;

        mockMvc.perform(post("/categories")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.categoryName").value("New Category"));
    }
}
