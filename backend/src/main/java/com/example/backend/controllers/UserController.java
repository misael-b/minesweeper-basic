package com.example.backend.controllers;

import com.example.backend.models.GameScore;
import com.example.backend.models.User;
import com.example.backend.models.data.UserRepository;
import com.example.backend.models.dto.RegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000/")
public class UserController {
    private UserRepository userRepository;

    private User loggedInUser;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO){
        if (userRepository.existsByUsername(registerDTO.getUsername())){
            return new ResponseEntity<>("Username is taken", HttpStatus.BAD_REQUEST);
        }
        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setPassword(registerDTO.getPassword());
        GameScore gameScore = new GameScore();
        user.setGameScore(gameScore);
        userRepository.save(user);
        this.loggedInUser = user;
        return new ResponseEntity<>("User registered success", HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody RegisterDTO registerDTO){
        if (userRepository.existsByUsername(registerDTO.getUsername())){
            User user = userRepository.findByUsername(registerDTO.getUsername()).get();
            if (user.getPassword().equals(registerDTO.getPassword())) {
                this.loggedInUser = user;
                return new ResponseEntity<>("User logged in", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("Bad credentials", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("logout")
    public ResponseEntity<String> logout(){
        this.loggedInUser = null;
        return new ResponseEntity<>("User logged out", HttpStatus.OK);
    }

    @GetMapping("isLoggedIn")
    public boolean isLoggedIn(){
        if (this.loggedInUser == null){
            return false;
        }
        return true;
    }

    public User getLoggedInUser() {
        return loggedInUser;
    }

    public void setLoggedInUser(User loggedInUser) {
        this.loggedInUser = loggedInUser;
    }
}
