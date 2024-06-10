package com.example.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class User {

    @Id
    @GeneratedValue
    private int id;
    @NotNull
    @NotBlank
    private String username;

    @NotNull
    @NotBlank
    private String password;

    @OneToOne(cascade= CascadeType.ALL)
    @NotNull
    private GameScore gameScore;

    public User(String username, String password, GameScore gameScore) {
        this.username = username;
        this.password = password;
        this.gameScore = gameScore;
    }

    public User() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public GameScore getGameScore() {
        return gameScore;
    }

    public void setGameScore(GameScore gameScore) {
        this.gameScore = gameScore;
    }

    public void addToScore(double score){
        this.gameScore.setScore(score);
    }
}
