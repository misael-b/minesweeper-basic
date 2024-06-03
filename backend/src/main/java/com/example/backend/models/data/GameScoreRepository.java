package com.example.backend.models.data;

import com.example.backend.models.GameScore;
import com.example.backend.models.User;
import org.springframework.data.repository.CrudRepository;

public interface GameScoreRepository extends CrudRepository<GameScore, Integer> {
}
