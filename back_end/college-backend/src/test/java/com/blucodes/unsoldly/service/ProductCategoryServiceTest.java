package com.blucodes.unsoldly.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.blucodes.unsoldly.entity.ProductCategory;
import com.blucodes.unsoldly.repository.ProductCategoryRepositroy;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ProductCategoryServiceTest {

    @Mock
    private ProductCategoryRepositroy ProductCategoryRepositroy;

    @InjectMocks
    private ProductCategoryService productCategoryService;

    @Test
    public void testFindByCategoryName() {
        ProductCategory category = new ProductCategory();
        category.setCategoryName("Electronics");

        when(ProductCategoryRepositroy.findByCategoryName("Electronics"))
            .thenReturn(Arrays.asList(category));

        List<ProductCategory> result = productCategoryService.findByCategoryName("Electronics");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Electronics", result.get(0).getCategoryName());

        verify(ProductCategoryRepositroy, times(1)).findByCategoryName("Electronics");
    }

    @Test
    public void testFindByCategoryCode() {
        ProductCategory category = new ProductCategory();
        category.setCategoryCode("ELEC");

        when(ProductCategoryRepositroy.findByCategoryCode("ELEC"))
            .thenReturn(Arrays.asList(category));

        List<ProductCategory> result = productCategoryService.findByCategoryCode("ELEC");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("ELEC", result.get(0).getCategoryCode());

        verify(ProductCategoryRepositroy, times(1)).findByCategoryCode("ELEC");
    }

    @Test
    public void testAddProductCategory() {
        ProductCategory category = new ProductCategory();
        category.setCategoryName("Books");

        when(ProductCategoryRepositroy.save(category)).thenReturn(category);

        ProductCategory saved = productCategoryService.addProductCategory(category);

        assertNotNull(saved);
        assertEquals("Books", saved.getCategoryName());

        verify(ProductCategoryRepositroy, times(1)).save(category);
    }

    @Test
    public void testDeleteProductCategoryById() {
        doNothing().when(ProductCategoryRepositroy).deleteById(1);

        productCategoryService.deleteProductCategoryById(1);

        verify(ProductCategoryRepositroy, times(1)).deleteById(1);
    }

    @Test
    public void testFindProductCategoryById() {
        ProductCategory category = new ProductCategory();
        category.setId(1);
        category.setCategoryName("Furniture");

        when(ProductCategoryRepositroy.findById(1)).thenReturn(Optional.of(category));

        ProductCategory found = productCategoryService.findProductCategoryById(1);

        assertNotNull(found);
        assertEquals(1, found.getId());
        assertEquals("Furniture", found.getCategoryName());

        verify(ProductCategoryRepositroy, times(1)).findById(1);
    }

    @Test
    public void testUpdateProductCategory() {
        ProductCategory category = new ProductCategory();
        category.setId(1);
        category.setCategoryName("Updated Category");

        when(ProductCategoryRepositroy.save(category)).thenReturn(category);

        ProductCategory updated = productCategoryService.updateProductCategory(category);

        assertNotNull(updated);
        assertEquals("Updated Category", updated.getCategoryName());

        verify(ProductCategoryRepositroy, times(1)).save(category);
    }

    @Test
    public void testGetAllProductCategories() {
        ProductCategory cat1 = new ProductCategory();
        ProductCategory cat2 = new ProductCategory();

        when(ProductCategoryRepositroy.findAll()).thenReturn(Arrays.asList(cat1, cat2));

        List<ProductCategory> list = productCategoryService.getAllProductCategories();

        assertEquals(2, list.size());

        verify(ProductCategoryRepositroy, times(1)).findAll();
    }
}
