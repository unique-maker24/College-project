package com.blucodes.unsoldly.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.blucodes.unsoldly.entity.Company;
import com.blucodes.unsoldly.service.CompanyService;

@WebMvcTest(controllers = CompanyController.class, excludeAutoConfiguration = org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class)
public class CompanyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CompanyService companyService;

    @Test
    public void testGetAllCompanies() throws Exception {
        Company c1 = new Company();
        c1.setId(1);
        c1.setCompanyName("Company A");

        Company c2 = new Company();
        c2.setId(2);
        c2.setCompanyName("Company B");

        Mockito.when(companyService.getAllCompanies()).thenReturn(new ArrayList<>(Arrays.asList(c1, c2)));

        mockMvc.perform(get("/companies")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].companyName").value("Company A"))
                .andExpect(jsonPath("$[1].companyName").value("Company B"));
    }

    @Test
    public void testGetCompanyById() throws Exception {
        Company c = new Company();
        c.setId(1);
        c.setCompanyName("Company A");

        Mockito.when(companyService.findCompanyById(1)).thenReturn(c);

        mockMvc.perform(get("/companies/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.companyName").value("Company A"));
    }

    @Test
    public void testDeleteCompany() throws Exception {
        Mockito.doNothing().when(companyService).deleteCompanyById(1);

        mockMvc.perform(delete("/companies/1"))
                .andExpect(status().isNoContent());

        Mockito.verify(companyService, Mockito.times(1)).deleteCompanyById(1);
    }

    @Test
    public void testUpdateCompany() throws Exception {
        Company updatedCompany = new Company();
        updatedCompany.setId(1);
        updatedCompany.setCompanyName("Updated Company");

        Mockito.when(companyService.updateCompany(Mockito.any(Company.class))).thenReturn(updatedCompany);

        String json = """
        {
            "companyName": "Updated Company"
        }
        """;

        mockMvc.perform(put("/companies/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.companyName").value("Updated Company"));
    }

    @Test
    public void testCreateCompany() throws Exception {
        Company newCompany = new Company();
        newCompany.setId(1);
        newCompany.setCompanyName("New Company");

        Mockito.when(companyService.addCompany(Mockito.any(Company.class))).thenReturn(newCompany);

        String json = """
        {
            "companyName": "New Company"
        }
        """;

        mockMvc.perform(post("/companies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.companyName").value("New Company"));
    }
    
    
    @Test
    public void testGetCompanyById_NotFound() throws Exception {
        Mockito.when(companyService.findCompanyById(1)).thenReturn(null);

        mockMvc.perform(get("/companies/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateCompany_InvalidInput() throws Exception {
        String invalidJson = "{ \"companyName\": \"\" }"; // Assuming empty name is invalid

        mockMvc.perform(put("/companies/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testCreateCompany_InvalidInput() throws Exception {
        String invalidJson = "{ }"; // Missing companyName field

        mockMvc.perform(post("/companies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
                .andExpect(status().isBadRequest());
    }
}
