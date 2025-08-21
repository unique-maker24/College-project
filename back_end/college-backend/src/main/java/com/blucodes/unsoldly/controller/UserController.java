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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blucodes.unsoldly.entity.User;
import com.blucodes.unsoldly.service.UserService;
import com.blucodes.unsoldly.elasticsearch.document.UserDocument;
import com.blucodes.unsoldly.elasticsearch.service.UserSearchService;


@RestController
public class UserController {

	@Autowired
    private  UserSearchService userSearchService;
	
	@Autowired
	private UserService userService;
	
	
	@GetMapping("/users")
	public List<UserDocument> getAllUsers() {
		return userService.getAllUsers();
	}
	
//	TODO: Fix this method to return 404 Not Found when user is not found.
//	Currently returns null and 200 OK
//	Also Do we need to change the method name from getCompanyById() to getUserById ?
	@GetMapping("/users/{id}")
	public User getCompanyById(@PathVariable("id") int id) {
		return userService.findUserById(id);
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id) {
		userService.deleteUserById(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/users/{id}")
	public User update(@PathVariable("id") Integer id, @RequestBody User user) {
		user.setId(id);
		return userService.updateUser(user);
	}

	@PostMapping("/register")
	public User register(@RequestBody User user) {
		return userService.registerUser(user);
	}
	
	
//	Reindexing
	@PostMapping("/reindex/users")
	public ResponseEntity<String> reIndexUser(){
		userSearchService.reindexUser();
        return ResponseEntity.ok("✅ Users reindexed successfully in Elasticsearch");
	}
	
//	Elastic Search
	
//	@Autowired
//	private UserSearchService userSearchService;
	
//	@GetMapping("/users/search")
//	public ResponseEntity<List<UserDocument>> searchUsers(@RequestParam String query){
//		List<UserDocument> results = userSearchService.searchUsersByFullName(query);
//	    return ResponseEntity.ok(results);
//	}

}
