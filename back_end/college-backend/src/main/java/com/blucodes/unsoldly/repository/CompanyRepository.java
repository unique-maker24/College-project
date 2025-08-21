package com.blucodes.unsoldly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blucodes.unsoldly.entity.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer>{
	List<Company> findByCompanyName(String companyName);
}

