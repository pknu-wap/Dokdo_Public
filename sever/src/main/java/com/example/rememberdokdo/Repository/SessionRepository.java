package com.example.rememberdokdo.Repository;

import com.example.rememberdokdo.Entity.SessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.Optional;

public interface SessionRepository extends JpaRepository<SessionEntity, String> {

    // 세션 ID로 유효한 세션 조회 (만료되지 않은 세션)
    Optional<SessionEntity> findBySessionIdAndExpiresAtAfter(String sessionId, LocalDateTime currentTime);
}
