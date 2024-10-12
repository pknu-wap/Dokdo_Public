package com.example.rememberdokdo.Service;
import com.example.rememberdokdo.Dto.SessionDto;
import com.example.rememberdokdo.Entity.SessionEntity;
import com.example.rememberdokdo.Repository.SessionRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    // 브라우저 접속 또는 새로고침 시 무조건 새로운 세션 발급
    public SessionDto startSession(HttpServletRequest request, HttpServletResponse response) {
        // 새로운 세션 ID 생성
        String sessionId = UUID.randomUUID().toString();

        // 새로운 세션 쿠키 생성
        createSessionCookie(sessionId, response);

        // 새로운 세션 엔티티 생성
        SessionEntity sessionEntity = SessionEntity.builder()
                .sessionId(sessionId)
                .userId(null)  // 게임 클리어 시 저장될 예정
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusHours(1))  // 1시간 세션 유지
                .isActive(true)
                .build();

        // 세션 정보를 DB에 저장
        sessionRepository.save(sessionEntity);

        // 세션 정보를 반환
        return SessionDto.fromEntity(sessionEntity);
    }

    // 세션 갱신 또는 새로 발급
    public SessionDto refreshSession(HttpServletRequest request, HttpServletResponse response) {
        // 새로운 세션 ID 생성
        String sessionId = UUID.randomUUID().toString();

        // 새로운 세션 쿠키 생성
        createSessionCookie(sessionId, response);

        // 새로운 세션 엔티티 생성
        SessionEntity sessionEntity = SessionEntity.builder()
                .sessionId(sessionId)
                .userId(null)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusHours(1))  // 세션 만료 시간 1시간 설정
                .isActive(true)
                .build();

        sessionRepository.save(sessionEntity);
        return SessionDto.fromEntity(sessionEntity);
    }

    /* 사용자 게임 클리어 시 userId 저장 (닉네임 저장)
    public SessionDto updateUserId(String sessionId, String userId) {
        SessionEntity session = sessionRepository.findById(sessionId).orElseThrow();
        session.setUserId(userId);  // 사용자 ID(닉네임) 업데이트
        sessionRepository.save(session);
        return SessionDto.fromEntity(session);
    }*/

    // 쿠키 생성 메서드
    public void createSessionCookie(String sessionId, HttpServletResponse response) {
        Cookie sessionCookie = new Cookie("SESSIONID", sessionId);
        sessionCookie.setMaxAge(3600);  // 1시간 유효
        sessionCookie.setHttpOnly(true);  // JavaScript로 접근 불가 (보안 강화)
        sessionCookie.setPath("/");  // 전체 경로에서 쿠키 사용 가능
        response.addCookie(sessionCookie);
    }
}
