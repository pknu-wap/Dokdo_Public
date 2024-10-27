package com.example.rememberdokdo.Repository;

import com.example.rememberdokdo.Entity.StageProgressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StageProgressRepository extends JpaRepository<StageProgressEntity, Integer> {
    // 특정 세션의 스테이지 진행 상태 조회
    List<StageProgressEntity> findBySessionId(String sessionId);
}
