package com.blucodes.unsoldly.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blucodes.unsoldly.entity.Company;
import com.blucodes.unsoldly.repository.CompanyRepository;

@Service
public class CompanyService {
	
	@Autowired
	private CompanyRepository companyRepository;
	
	
	public List<Company> findByCompanyName(String companyName){
		return companyRepository.findByCompanyName(companyName);
	}
	
	public Company addCompany(Company company) {
		Company savedCompany = companyRepository.save(company);
		return savedCompany;
	}
	
	public void deleteCompanyById(int id) {
		companyRepository.deleteById(id);
	}

	public Company findCompanyById(int id) {
		Company company = companyRepository.findById(id).get();
		return company;
	}

	public Company updateCompany(Company company) {
		return companyRepository.save(company);
	}
	
	public List<Company> getAllCompanies() {
		return companyRepository.findAll();
	}
}