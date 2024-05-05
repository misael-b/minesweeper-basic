package com.example.backend.controllers;

import com.example.backend.models.TableGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.TabExpander;
import java.util.ArrayList;

@RestController
@RequestMapping("game")
@CrossOrigin("http://localhost:3000/")
public class GameController {
    private TableGenerator tableGenerator;

    @Autowired
    public GameController(TableGenerator tableGenerator) {
        this.tableGenerator = tableGenerator;
    }

    @GetMapping
    public String[] initiateGame(
            @RequestParam int numOfBombs,@RequestParam int numOfSpaces
    ){
        this.tableGenerator.generateBoard(numOfBombs, numOfSpaces);
        return tableGenerator.getBoard();
    }


}
