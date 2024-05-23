package com.example.backend.controllers;

import com.example.backend.models.GameScore;
import com.example.backend.models.TableGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Objects;

@RestController
@RequestMapping("game")
@CrossOrigin("http://localhost:3001/")
public class GameController {
    private TableGenerator tableGenerator;

    private GameScore gameScore;

    private String gameDifficulty;

    private double gameScoreMultiplier;

    private ArrayList<Integer> numbers = new ArrayList<>();

    private int numOfSpaces;
    private int numOfBombs;

    @Autowired
    public GameController(TableGenerator tableGenerator, GameScore gameScore) {
        this.gameScore = gameScore;
        this.tableGenerator = tableGenerator;
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

        if(Objects.equals(tableGenerator.getBoard()[userPick], "O")){
            this.gameScore.setScore(1*gameScoreMultiplier);
        }

        if(numbers.size() == numOfSpaces - numOfBombs){
            if(this.gameDifficulty.equals("hard")){
                this.gameScore.setScore(1000);
            }else if (this.gameDifficulty.equals("medium")){
                this.gameScore.setScore(500);
            }else {
                this.gameScore.setScore(250);
            }
            return "Winner";
        }

        return tableGenerator.getBoard()[userPick];
    }

    @GetMapping("score")
    public double returnScore(){
        return this.gameScore.getScore();
    }


}
