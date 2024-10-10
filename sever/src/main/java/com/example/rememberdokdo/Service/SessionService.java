package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.SessionDto;
import com.example.rememberdokdo.Entity.SessionEntity;
import com.example.rememberdokdo.Repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

public class SessionService {

    /*@Autowired
    @Service
    private SessionRepository sessionRepository;

    public SessionDto startSession(String userId) {
        // 세션 ID 생성
        String sessionId = UUID.randomUUID().toString();

        // 세션 엔티티 생성
        SessionEntity sessionEntity = SessionEntity.builder()
                .id(sessionId)
                .userId(userId)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusHours(1))  // 만료 시간은 1시간으로 설정
                .isActive(true)
                .build();

        // 세션 정보를 DB에 저장
        sessionRepository.save(sessionEntity);

        // 엔티티를 DTO로 변환 후 반환
        return SessionDto.fromEntity(sessionEntity);
    }*/
}

