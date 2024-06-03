package com.example.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.springframework.stereotype.Component;

@Component
@Entity
public class GameScore {

    @Id
    @GeneratedValue
    private int id;
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
