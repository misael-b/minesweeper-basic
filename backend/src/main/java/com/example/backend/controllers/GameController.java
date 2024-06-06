package com.example.backend.controllers;

import com.example.backend.models.TableGenerator;
import com.example.backend.models.User;
import com.example.backend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("game")
@CrossOrigin("http://localhost:3000/")
public class GameController {
    private TableGenerator tableGenerator;

    private String gameDifficulty;

    private double gameScoreMultiplier;

    private ArrayList<Integer> numbers = new ArrayList<>();

    private int numOfSpaces;
    private int numOfBombs;

    private UserController userController;

    UserRepository userRepository;

    @Autowired
    public GameController(TableGenerator tableGenerator, UserController userController, UserRepository userRepository) {
        this.tableGenerator = tableGenerator;
        this.userController = userController;
        this.userRepository = userRepository;
    }

    @GetMapping
    public String[] initiateGame(@RequestParam int numOfBombs,@RequestParam int numOfSpaces){
        this.numOfSpaces = numOfSpaces;
        this.numOfBombs = numOfBombs;
        numbers = new ArrayList<>();

        if (numOfSpaces == 9){
            this.gameScoreMultiplier = 75;
            this.gameDifficulty = "hard";
        } else if(numOfSpaces == 25){
            this.gameScoreMultiplier = 15;
            this.gameDifficulty = "medium";
        } else {
            this.gameScoreMultiplier = 5;
            this.gameDifficulty = "easy";
        }

        if (numOfBombs == 5){
            this.gameScoreMultiplier = this.gameScoreMultiplier * 2;
        }else if (numOfBombs == 3){
            this.gameScoreMultiplier = this.gameScoreMultiplier *1.3;
        }

        this.tableGenerator.generateBoard(numOfBombs, numOfSpaces);
        return tableGenerator.getBoard();
    }

    @GetMapping("feedback")
    public String userPickResult(@RequestParam int userPick){
        if(!numbers.contains(userPick)){
            numbers.add(userPick);
        }

        if(numbers.size() == numOfSpaces - numOfBombs){
            if(this.gameDifficulty.equals("hard")){
                User loggedInUser = this.userController.getLoggedInUser();
                loggedInUser.addToScore(1000);
                loggedInUser.addToScore(numbers.size()*gameScoreMultiplier);
            }else if (this.gameDifficulty.equals("medium")){
                User loggedInUser = this.userController.getLoggedInUser();
                loggedInUser.addToScore(numbers.size()*gameScoreMultiplier);
                loggedInUser.addToScore(500);
            }else {
                User loggedInUser = this.userController.getLoggedInUser();
                loggedInUser.addToScore(numbers.size()*gameScoreMultiplier);
                loggedInUser.addToScore(250);
            }
            return "Winner";
        }

        return tableGenerator.getBoard()[userPick];
    }

    @GetMapping("score")
    public double returnScore(){
        User loggedInUser = this.userController.getLoggedInUser();
        userRepository.save(loggedInUser);
        return loggedInUser.getGameScore().getScore();
    }

    @GetMapping("endGame")
    public void endGame(){
        User loggedInUser = this.userController.getLoggedInUser();
        loggedInUser.addToScore(numbers.size()*gameScoreMultiplier);
    }


}
