package com.blucodes.unsoldly.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;

import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;


import com.blucodes.unsoldly.authentication.JwtTokenService;
import com.blucodes.unsoldly.entity.User;
import com.blucodes.unsoldly.service.UserService;

//@WebMvcTest(UserController.class)
@WebMvcTest(controllers = UserController.class, excludeAutoConfiguration = org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class)
public class UserControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UserService userService;

	@MockBean
	private JwtTokenService jwtTokenService;

//		@GetMapping("/users")
//	@Test
//	public void testGetAllUsers() throws Exception {
//		User user1 = new User();
//		user1.setFullName("Vaibhav Adesara");
//		user1.setEmail("vaibhav@adesara.com");
//
//		User user2 = new User();
//		user2.setId(2);
//		user2.setFullName("John Doe");
//		user2.setEmail("John@Doe.com");
//
//		ArrayList<User> user = new ArrayList<>();
//		user.add(user1);
//		user.add(user2);
//
////		Users user[] = new User();
////		user
//
////		        // Mock the service call
//		Mockito.when(userService.getAllUsers()).thenReturn(user);
//
//// Perform GET request and expect JSON with 2 users
//		mockMvc.perform(get("/users").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()) // HTTP 200
//				.andExpect(jsonPath("$.length()").value(2)) // check size
//				.andExpect(jsonPath("$[0].email").value("vaibhav@adesara.com"))
//				.andExpect(jsonPath("$[1].fullName").value("John Doe"));
//
//	}

//		@GetMapping("/users/{id}")

	@Test
	public void testGetUserById_Found() throws Exception {
		User user = new User();
		user.setId(1);
		user.setFullName("Vaibhav Adesara");
		user.setEmail("vaibhav@adesara.com");

		Mockito.when(userService.findUserById(1)).thenReturn(user);

		mockMvc.perform(get("/users/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$.email").value("vaibhav@adesara.com"))
				.andExpect(jsonPath("$.fullName").value("Vaibhav Adesara"));
	}

//		@GetMapping("/users/{id}") :- NOT FOUND
	@Test
	public void testGetUserById_NotFound() throws Exception {
		Mockito.when(userService.findUserById(1)).thenReturn(null);

		mockMvc.perform(get("/users/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isNotFound());
	}

	
//		@DeleteMapping("/users/{id}")
	@Test
	public void testDeleteUser() throws Exception {
		Mockito.doNothing().when(userService).deleteUserById(1);

		mockMvc.perform(delete("/users/1")).andExpect(status().isNoContent());

		Mockito.verify(userService, Mockito.times(1)).deleteUserById(1);
	}
	
//		@PutMapping("/users/{id}")
	@Test
	public void testUpdateUser() throws Exception {
	    User user = new User();
	    user.setId(1);
	    user.setFullName("Updated Name");
	    user.setEmail("updated@example.com");

	    Mockito.when(userService.updateUser(Mockito.any(User.class))).thenReturn(user);

	    String userJson = """
	    {
	      "fullName": "Updated Name",
	      "email": "updated@example.com"
	    }
	    """;

	    mockMvc.perform(put("/users/1")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content(userJson))
	        .andExpect(status().isOk())
	        .andExpect(jsonPath("$.fullName").value("Updated Name"))
	        .andExpect(jsonPath("$.email").value("updated@example.com"));

	    Mockito.verify(userService, Mockito.times(1)).updateUser(Mockito.any(User.class));
	}
	
//		@PostMapping("/register")
	@Test
	public void testRegisterUser() throws Exception {
	    User user = new User();
	    user.setId(1);
	    user.setFullName("New User");
	    user.setEmail("newuser@example.com");

	    Mockito.when(userService.registerUser(Mockito.any(User.class))).thenReturn(user);

	    String userJson = """
	    {
	      "fullName": "New User",
	      "email": "newuser@example.com"
	    }
	    """;

	    mockMvc.perform(post("/register")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content(userJson))
	        .andExpect(status().isOk())
	        .andExpect(jsonPath("$.id").value(1))
	        .andExpect(jsonPath("$.fullName").value("New User"))
	        .andExpect(jsonPath("$.email").value("newuser@example.com"));

	    Mockito.verify(userService, Mockito.times(1)).registerUser(Mockito.any(User.class));
	}


}
