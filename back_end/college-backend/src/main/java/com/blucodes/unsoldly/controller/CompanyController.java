package com.blucodes.unsoldly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blucodes.unsoldly.entity.Company;
import com.blucodes.unsoldly.service.CompanyService;


@RestController
public class CompanyController {
	
	@Autowired
	private CompanyService companyService;
	
	@GetMapping("/companies")
	public List<Company> getAllCompanies() {
		return companyService.getAllCompanies();
	}
	
	@GetMapping("/companies/{id}")
	public Company getCompanyById(@PathVariable("id") int id) {
		return companyService.findCompanyById(id);
	}

	@DeleteMapping("/companies/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id) {
		companyService.deleteCompanyById(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/companies/{id}")
	public Company update(@PathVariable("id") Integer id, @RequestBody Company company) {
		company.setId(id);
		return companyService.updateCompany(company);
	}

	@PostMapping("/companies")
	public Company create( @RequestBody Company company) {
		return companyService.addCompany(company);
	}

}
