package com.blucodes.unsoldly.elasticsearch.document;

//package com.blucodes.unsoldly.elasticsearch.document;

import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "users") // Elasticsearch index name
public class UserDocument {

	@Id
//	@GeneratedValue
	private Integer id;
//	private String id;

	private String fullName;
	@Column(unique = true)
	private String email;
	private String password;
	private String addressLine1;
	private String addressLine2;
	private String city;
	private String state;
	private String country;
	private String postalCode;
	private String phoneNumber;
	private String cellNumber;
	
}
