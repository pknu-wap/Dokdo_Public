package com.example.rememberdokdo.Repository;

import com.example.rememberdokdo.Entity.StageProgressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StageProgressRepository extends JpaRepository<StageProgressEntity, Integer> {
    // 특정 세션의 스테이지 진행 상태 조회
    List<StageProgressEntity> findBySessionId(String sessionId);

    // 특정 세션과 스테이지 ID로 엔티티 찾기
    Optional<StageProgressEntity> findBySessionIdAndStageId(String sessionId, int stageId);

    // sessionId가 같은 모든 레코드 삭제하는 메서드
    @Modifying
    @Query("DELETE FROM StageProgressEntity p WHERE p.sessionId = :sessionId")
    void deleteAllBySessionId(@Param("sessionId") String sessionId);}
