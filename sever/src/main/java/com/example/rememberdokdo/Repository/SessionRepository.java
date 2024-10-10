package com.example.rememberdokdo.Repository;

import com.example.rememberdokdo.Entity.SessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<SessionEntity, String> {
    // JpaRepository를 사용하여 기본적인 CRUD 메서드를 제공
}
