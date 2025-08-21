package com.blucodes.unsoldly.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.blucodes.unsoldly.entity.Company;
import com.blucodes.unsoldly.repository.CompanyRepository;

@ExtendWith(MockitoExtension.class)
public class CompanyServiceTest {

    @Mock
    private CompanyRepository companyRepository;

    @InjectMocks
    private CompanyService companyService;

    @Test
    void testFindByCompanyName() {
        String companyName = "TestCo";
        List<Company> mockCompanies = Arrays.asList(new Company(), new Company());
        when(companyRepository.findByCompanyName(companyName)).thenReturn(mockCompanies);

        List<Company> result = companyService.findByCompanyName(companyName);

        assertEquals(2, result.size());
        verify(companyRepository, times(1)).findByCompanyName(companyName);
    }

    @Test
    void testAddCompany() {
        Company company = new Company();
        when(companyRepository.save(company)).thenReturn(company);

        Company saved = companyService.addCompany(company);

        assertNotNull(saved);
        verify(companyRepository, times(1)).save(company);
    }

    @Test
    void testDeleteCompanyById() {
        doNothing().when(companyRepository).deleteById(1);

        companyService.deleteCompanyById(1);

        verify(companyRepository, times(1)).deleteById(1);
    }

    @Test
    void testFindCompanyById() {
        Company company = new Company();
        company.setId(1);
        when(companyRepository.findById(1)).thenReturn(Optional.of(company));

        Company found = companyService.findCompanyById(1);

        assertNotNull(found);
        assertEquals(1, found.getId());
        verify(companyRepository, times(1)).findById(1);
    }

    @Test
    void testUpdateCompany() {
        Company company = new Company();
        when(companyRepository.save(company)).thenReturn(company);

        Company updated = companyService.updateCompany(company);

        assertNotNull(updated);
        verify(companyRepository, times(1)).save(company);
    }

    @Test
    void testGetAllCompanies() {
        List<Company> companies = Arrays.asList(new Company(), new Company());
        when(companyRepository.findAll()).thenReturn(companies);

        List<Company> result = companyService.getAllCompanies();

        assertEquals(2, result.size());
        verify(companyRepository, times(1)).findAll();
    }
}
