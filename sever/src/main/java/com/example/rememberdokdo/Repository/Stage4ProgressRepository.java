package com.example.rememberdokdo.Repository;

import com.example.rememberdokdo.Entity.Stage4ProgressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Stage4ProgressRepository extends JpaRepository<Stage4ProgressEntity, Integer> {
    Optional<Stage4ProgressEntity> findBySessionId(String sessionId); // 세션 식별자와 매핑된 스테이지 4 진행 상황 식별자 존재 여부 확인
}
