package com.blucodes.unsoldly.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blucodes.unsoldly.elasticsearch.UserIndexer;
import com.blucodes.unsoldly.elasticsearch.document.UserDocument;
import com.blucodes.unsoldly.elasticsearch.repository.UserSearchRepository;
import com.blucodes.unsoldly.elasticsearch.service.UserSearchService;
import com.blucodes.unsoldly.entity.User;
import com.blucodes.unsoldly.repository.UserRepository;

@Service
public class UserService {

	@Autowired
    private  UserSearchService userSearchService;
	
	@Autowired
	private UserRepository userRepository;
	
//	@Autowired // For Elastic Search
//	 private UserSearchRepository userSearchRepository;
	
//	@Autowired // For Creating Indexing in ElasticSearch
	private UserIndexer userIndexer;

	
	public User findByUserEmail(String email){
		return userRepository.findByEmail(email);
	}
	 
	public User registerUser(User user) {
		User savedUser = userRepository.save(user);
//		userSearchRepository.save(user);
		     userSearchService.indexUser(savedUser);
		return  savedUser;
	}
	
	public void deleteUserById(int id) {
		userRepository.deleteById(id);
//		 userSearchService.indexUser(id);
		userSearchService.deleteUserFromIndex(id);
		
	}

	public User findUserById(int id) {
		return userRepository.findById(id).get();
	}

	public User updateUser(User user) {
		User updatedUser =userRepository.save(user);
		userSearchService.indexUser(user);
		return updatedUser;

	}
	
//	Get Data From DB 
//	public List<User> getAllUsers() {
//		return userRepository.findAll();
//	}
	
	
//	Get Data From Elastic Search
	public List<UserDocument> getAllUsers(){
		System.out.println("Called Elastic Search All Data Users");
		Iterable<UserDocument> iterable = userSearchService.getAllUsers();
		List<UserDocument> list = new ArrayList<>();
		iterable.forEach(list::add);
		return list;
	}
}