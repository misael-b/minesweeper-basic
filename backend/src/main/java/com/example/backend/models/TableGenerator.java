package com.example.backend.models;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.ArrayList;


@Component
public class TableGenerator {
    private String[] board;

    private int numOfBombs;

    public void generateBoard(int numOfBombs, int numOfSpaces){
        this.board = new String[numOfSpaces];
        ArrayList<Integer> bombLocations = new ArrayList<>();
        this.numOfBombs = numOfBombs;
        while (bombLocations.size() < numOfBombs){
            int bombLocation = (int) (Math.random() * numOfSpaces);
            if(!bombLocations.contains(bombLocation)){
                bombLocations.add(bombLocation);
                board[bombLocation] = "X";
            }
        }

        for (int i = 0; i < board.length; i++){
            if (board[i] == null){
                board[i] = "O";
            }
        }
    }

    public String[] getBoard() {
        return board;
    }

    public void setBoard(String[] board) {
        this.board = board;
    }

    public int getNumOfBombs() {
        return numOfBombs;
    }

    public void setNumOfBombs(int numOfBombs) {
        this.numOfBombs = numOfBombs;
    }
}
