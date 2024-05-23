package com.example.backend.models;

import org.springframework.stereotype.Component;

@Component
public class GameScore {
    private double score;

    public GameScore() {
        this.score = 0;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = this.score +score;
    }
}
