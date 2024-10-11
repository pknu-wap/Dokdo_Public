package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.SessionDto;
import com.example.rememberdokdo.Entity.SessionEntity;
import com.example.rememberdokdo.Repository.SessionRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service  // Service 어노테이션 추가
public class SessionService {

    @Autowired  // Autowired 어노테이션 추가
    private SessionRepository sessionRepository;

    public SessionDto startSession(String userId) {
        // 세션 ID 생성
        String sessionId = UUID.randomUUID().toString();

        // 세션 엔티티 생성
        SessionEntity sessionEntity = SessionEntity.builder()
                .id(sessionId)
                .userId(userId)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusHours(1))  // 일단 만료 시간은 1시간으로 설정
                .isActive(true)
                .build();

        // 세션 정보를 DB에 저장
        sessionRepository.save(sessionEntity);

        // 엔티티를 DTO로 변환 후 반환
        return SessionDto.fromEntity(sessionEntity);
    }

    // 쿠키 생성 메서드
    public void createSessionCookie(String sessionId, HttpServletResponse response) {
        Cookie sessionCookie = new Cookie("SESSIONID", sessionId);
        sessionCookie.setMaxAge(3600);  // 1시간 유효
        sessionCookie.setHttpOnly(true);  // JavaScript로 접근 불가 (보안 강화)
        sessionCookie.setPath("/");  // 전체 경로에서 쿠키 사용 가능
        response.addCookie(sessionCookie);
    }
}


