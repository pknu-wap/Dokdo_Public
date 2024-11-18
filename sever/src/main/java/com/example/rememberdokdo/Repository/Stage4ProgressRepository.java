package com.example.rememberdokdo.Repository;

import com.example.rememberdokdo.Entity.Stage4ProgressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Stage4ProgressRepository extends JpaRepository<Stage4ProgressEntity, Integer> {
    Optional<Stage4ProgressEntity> findBySessionId(String sessionId); // 세션 식별자와 매핑된 스테이지 4 진행 상황 식별자 존재 여부 확인

    // sessionId로 가장 최신의 Stage4ProgressEntity 가져오는 쿼리
    @Query("SELECT s FROM Stage4ProgressEntity s WHERE s.sessionId = :sessionId AND s.progressId = (SELECT MAX(s2.progressId) FROM Stage4ProgressEntity s2 WHERE s2.sessionId = :sessionId)")
    Optional<Stage4ProgressEntity> findLatestBySessionId(@Param("sessionId") String sessionId);
}
