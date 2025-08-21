package com.blucodes.unsoldly.elasticsearch.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

import com.blucodes.unsoldly.entity.User;
import com.blucodes.unsoldly.repository.UserRepository;
import com.blucodes.unsoldly.elasticsearch.document.UserDocument;
import com.blucodes.unsoldly.elasticsearch.repository.UserSearchRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserSearchService {

	private final UserSearchRepository userSearchRepository;

	@Autowired
	private UserRepository userRepository;

//	@Autowired
//	private ElasticsearchOperations elasticsearchOperations;

	public void indexUser(User user) {
		UserDocument doc = new UserDocument(user.getId(), // Add id to UserDocument constructor if needed
				user.getFullName(), user.getEmail(), user.getPassword(), user.getAddressLine1(), user.getAddressLine2(),
				user.getCity(), user.getState(), user.getCountry(), user.getPostalCode(), user.getPhoneNumber(),
				user.getCellNumber());
		userSearchRepository.save(doc);
	}

//    Reindex all data to sync with DB
	public void reindexUser() {

		// 1. Delete all documents in ES index
		userSearchRepository.deleteAll();

		// 2. Fetch fresh users from DB
		List<User> users = userRepository.findAll();

		// 3. Convert to UserDocument
		List<UserDocument> documents = users.stream().map(this::mapToDocument).toList();

		// 4. Save to Elasticsearch
		userSearchRepository.saveAll(documents);

		System.out.println("✅ Reindex completed: " + documents.size() + " users");

	}

	private UserDocument mapToDocument(User user) {
		return new UserDocument(user.getId(), user.getFullName(), user.getEmail(), user.getPassword(),
				user.getAddressLine1(), user.getAddressLine2(), user.getCity(), user.getState(), user.getCountry(),
				user.getPostalCode(), user.getPhoneNumber(), user.getCellNumber());
	}

//    Delete Index by ID
	public void deleteUserFromIndex(int id) {
		userSearchRepository.deleteById(id);
	}

//    Fetch All Data From Elastic Search 

	public Iterable<UserDocument> getAllUsers() {
		return userSearchRepository.findAll();
	}

	// method to search by full name
	public List<UserDocument> searchUsersByFullName(String fullName) {
		return userSearchRepository.findByFullName(fullName);
	}
}
