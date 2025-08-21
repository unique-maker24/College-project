package com.blucodes.unsoldly.service;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.MockitoAnnotations;

import com.blucodes.unsoldly.elasticsearch.document.UserDocument;
import com.blucodes.unsoldly.entity.User;
import com.blucodes.unsoldly.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

	@Mock
	private UserRepository userRepository; // Fake repo
	
	
	@InjectMocks
	private UserService userService;  // Test this class
	
	@Test
	void findByUserEmail_ShouldReturnUser_WhenEmailExists() {
		
	    // Arrange (setup test data)

		String email = "vaibhav@adesara.com";		
		User mockUser = new User();
		mockUser.setEmail(email);
		mockUser.setFullName("Vaibhav Adesara");
//		arrange
		when(userRepository.findByEmail(email)).thenReturn(mockUser);
		
	    // Act (call the method under test)
		User result = userService.findByUserEmail(email);
		
//		assert
	    // Assert (verify expected behavior)
		System.out.println("✅✔️ Test for existing email passed!");
		System.out.println("Returned user: " + result);

		assertNotNull(result);
		assertEquals(email, result.getEmail());
		assertEquals("Vaibhav Adesara", result.getFullName());
		
//		Verify Repository method was called exactly once
		verify(userRepository, times(1)).findByEmail(email);
		
	}
	
	@Test
	void findByUserEmail_ShouldReturnNull_WhenEmailNotFound() {
		String email = "missing@example.com";
		
		when(userRepository.findByEmail(email)).thenReturn(null);
		
		User result = userService.findByUserEmail(email);
		
		assertNull(result);

		verify(userRepository, times(1)).findByEmail(email);
		
		
		
	}
	
	
	
	@Test
    void testFindByUserEmail() {
        User user = new User();
        user.setEmail("test@example.com");

        when(userRepository.findByEmail("test@example.com")).thenReturn(user);

        User result = userService.findByUserEmail("test@example.com");
        assertEquals("test@example.com", result.getEmail());
    }

    @Test
    void testRegisterUser() {
        User user = new User();
        user.setEmail("new@example.com");

        when(userRepository.save(user)).thenReturn(user);

        User result = userService.registerUser(user);
        assertEquals("new@example.com", result.getEmail());
    }

    @Test
    void testDeleteUserById() {
        doNothing().when(userRepository).deleteById(1);
        userService.deleteUserById(1);
        verify(userRepository, times(1)).deleteById(1);
    }

    @Test
    void testFindUserById() {
        User user = new User();
        user.setId(1);

        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        User result = userService.findUserById(1);
        assertEquals(1, result.getId());
    }
 // Test change to trigger Jenkins build

    @Test
    void testUpdateUser() {
        User user = new User();
        user.setId(1);
        user.setEmail("updated@example.com");

        when(userRepository.save(user)).thenReturn(user);

        User result = userService.updateUser(user);
        assertEquals("updated@example.com", result.getEmail());
    }

    @Test
    void testGetAllUsers() {
        User user1 = new User();
        User user2 = new User();

        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));

        List<UserDocument> result = userService.getAllUsers();
        assertEquals(2, result.size());
    }
    
    @Test
    void testFindUserById_NotFound() {
        when(userRepository.findById(999)).thenReturn(Optional.empty());
        
        // Expect exception or null based on your chosen handling
        assertThrows(NoSuchElementException.class, () -> userService.findUserById(999));
        
        verify(userRepository, times(1)).findById(999);
    }

	
}
