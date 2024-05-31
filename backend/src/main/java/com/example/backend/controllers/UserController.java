package com.example.backend.controllers;

import com.example.backend.models.User;
import com.example.backend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3001/")
public class UserController {
    private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody User user){
        if (userRepository.existsByUsername(user.getUsername())){
            return new ResponseEntity<>("Username is taken", HttpStatus.BAD_REQUEST);
        }
        userRepository.save(user);
        return new ResponseEntity<>("User registered success", HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody User user){
        return new ResponseEntity<>("User logged in", HttpStatus.OK);
    }
}
