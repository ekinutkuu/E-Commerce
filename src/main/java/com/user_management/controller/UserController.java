package com.user_management.controller;

import com.user_management.exception.ResourceNotFoundException;
import com.user_management.repository.UserRepository;
import com.user_management.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // get all users
    @GetMapping("/users")
    public List<User> getAllUser(){
        return userRepository.findAll();
    }

    // create user
    @PostMapping("/users")
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
    }

    // get user by id
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id: " + id));
        return ResponseEntity.ok(user);
    }

    // update user
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id: " + id));

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmailId(userDetails.getEmailId());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setPassword(userDetails.getPassword());
        user.setUserType(userDetails.getUserType());

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    // delete user
    @DeleteMapping("/users/{id}")
   public  ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User is not exist with id: " + id));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // authenticate user
    @PostMapping("users/login")
    public ResponseEntity<User> authenticateUser(@RequestBody User loginUser) {
        User user = userRepository.findByEmailId(loginUser.getEmailId());
        if (user == null || !user.getPassword().equals(loginUser.getPassword())) {
            throw new ResourceNotFoundException("Invalid email or password");
        }
        return ResponseEntity.ok(user);
    }

}