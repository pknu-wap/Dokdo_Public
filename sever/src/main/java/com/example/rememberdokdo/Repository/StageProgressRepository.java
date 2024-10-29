package com.example.rememberdokdo.Repository;

import com.example.rememberdokdo.Entity.StageProgressEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StageProgressRepository extends JpaRepository<StageProgressEntity, Integer> {
    List<StageProgressEntity> findBySessionId(String sessionId);
    Optional<StageProgressEntity> findBySessionIdAndStageId(String sessionId, int stageId);
}