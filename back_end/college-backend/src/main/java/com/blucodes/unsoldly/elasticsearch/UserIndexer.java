package com.blucodes.unsoldly.elasticsearch;

import java.util.List;
import java.util.logging.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.blucodes.unsoldly.entity.User;
import com.blucodes.unsoldly.repository.UserRepository;
import com.blucodes.unsoldly.elasticsearch.service.UserSearchService;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor 
//@Profile("dev")
//@Component
public class UserIndexer implements CommandLineRunner { 

	private final UserRepository userRepository;
	private final UserSearchService userSearchService;
	
//	private static final Logger logger = (Logger) LoggerFactory.getLogger(UserIndexer.class);

	
	@Override
	public void run(String... args) throws Exception {
	    System.out.println("✅ UserIndexer started...");
	    userRepository.findAll().forEach(user -> { 
	        System.out.println("Indexing user: " + user.getFullName());
	        userSearchService.indexUser(user);
	    });
	} 
	
}
