package com.blucodes.unsoldly.elasticsearch.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blucodes.unsoldly.elasticsearch.document.UserDocument;
import com.blucodes.unsoldly.elasticsearch.service.UserSearchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/es/users")
@RequiredArgsConstructor
public class UserSearchController {
	
	 private final UserSearchService userSearchService;

	 
//	 Manual Re-Index To keep All User Data Sync with DB.
	 @PostMapping("/reindex/users")
	 public void reIndexUser() {
		 userSearchService.reindexUser();
	 }
	 
	    @GetMapping("/search")
	    public ResponseEntity<List<UserDocument>> searchUsers(@RequestParam String query) {
	        List<UserDocument> results = userSearchService.searchUsersByFullName(query);
	        return ResponseEntity.ok(results);
	    }

}
