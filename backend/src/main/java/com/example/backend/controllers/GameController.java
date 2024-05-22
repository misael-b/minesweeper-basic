package com.example.backend.controllers;

import com.example.backend.models.TableGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("game")
@CrossOrigin("http://localhost:3001/")
public class GameController {
    private TableGenerator tableGenerator;

    private ArrayList<Integer> numbers = new ArrayList<>();

    private int numOfSpaces;
    private int numOfBombs;

    @Autowired
    public GameController(TableGenerator tableGenerator) {
        this.tableGenerator = tableGenerator;
    }

    @GetMapping
    public String[] initiateGame(@RequestParam int numOfBombs,@RequestParam int numOfSpaces){
        this.numOfSpaces = numOfSpaces;
        this.numOfBombs = numOfBombs;
        numbers = new ArrayList<>();
        this.tableGenerator.generateBoard(numOfBombs, numOfSpaces);
        return tableGenerator.getBoard();
    }

    @GetMapping("feedback")
    public String userPickResult(@RequestParam int userPick){
        if(!numbers.contains(userPick)){
            numbers.add(userPick);
        }
        if(numbers.size() == numOfSpaces - numOfBombs){
            return "Winner";
        }

        return tableGenerator.getBoard()[userPick];
    }

}
