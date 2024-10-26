package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.SessionDto;
import com.example.rememberdokdo.Entity.SessionEntity;
import com.example.rememberdokdo.Repository.SessionRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class SessionService {

    private static final Logger logger = LoggerFactory.getLogger(SessionService.class);

    @Autowired
    private SessionRepository sessionRepository;

    // 브라우저 접속 시 세션 시작 (쿠키로 세션 ID 전달)
    public SessionDto startSession(HttpServletRequest request, HttpServletResponse response) {
        // 기존 세션 쿠키 확인
        Cookie[] cookies = request.getCookies();
        String sessionId = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("SESSIONID".equals(cookie.getName())) {
                    sessionId = cookie.getValue();
                    break;
                }
            }
        }

        // 기존 세션이 존재하면 만료시키고 DB에서 삭제
        if (sessionId != null && validateSession(sessionId)) {
            sessionRepository.deleteById(sessionId);  // 기존 세션 삭제
        }

        // 새로운 세션 생성
        sessionId = UUID.randomUUID().toString();  // 새로운 세션 ID 생성
        createSessionCookie(sessionId, response);  // 쿠키에 저장

        // 세션 엔티티 생성
        SessionEntity sessionEntity = SessionEntity.builder()
                .sessionId(sessionId)
                .userId(null)  // 필요 시 저장
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusHours(1))  // 1시간 세션 유지
                .isActive(true)
                .build();

        // 세션 정보를 DB에 저장
        sessionRepository.save(sessionEntity);

        // 세션 정보를 반환
        return SessionDto.fromEntity(sessionEntity);
    }

    // 세션 유효성 확인
    public boolean validateSession(String sessionId) {
        if (sessionId == null) {
            return false;
        }
        return sessionRepository.findBySessionIdAndExpiresAtAfter(sessionId, LocalDateTime.now()).isPresent();
    }

    // 세션 갱신 또는 새로 발급
    public SessionDto refreshSession(HttpServletRequest request, HttpServletResponse response) {
        String sessionId = UUID.randomUUID().toString(); // 새로운 세션 ID 생성
        createSessionCookie(sessionId, response);  // 새로운 쿠키 저장

        // 새로운 세션 엔티티 생성
        SessionEntity sessionEntity = SessionEntity.builder()
                .sessionId(sessionId)
                .userId(null)  // 필요시 저장
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusHours(1))  // 1시간 세션 유지
                .isActive(true)
                .build();

        // 세션 정보를 DB에 저장
        sessionRepository.save(sessionEntity);

        return SessionDto.fromEntity(sessionEntity);
    }

    // 쿠키 생성 메서드
    private void createSessionCookie(String sessionId, HttpServletResponse response) {
        Cookie sessionCookie = new Cookie("SESSIONID", sessionId);
        sessionCookie.setMaxAge(3600);  // 1시간 유효
        sessionCookie.setHttpOnly(true);  // JavaScript로 접근 불가 (보안 강화)
        sessionCookie.setPath("/");  // 전체 경로에서 쿠키 사용 가능
        response.addCookie(sessionCookie);
    }

    // 매 시간마다 만료된 세션 삭제 (정기적으로 만료된 세션 정리)
    @Scheduled(fixedRate = 3600000)  // 1시간마다 실행
    public void deleteExpiredSessions() {
        try {
            int deletedCount = sessionRepository.deleteByExpiresAtBefore(LocalDateTime.now());
            logger.info("만료된 세션 삭제 완료: 삭제된 세션 수 = {}", deletedCount);
        } catch (Exception e) {
            logger.error("만료된 세션 삭제 실패", e);
        }
    }

    /*사용자 게임 클리어 시 userId 저장 (닉네임 저장)
    public SessionDto updateUserId(String sessionId, String userId) {
        SessionEntity session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));
        session.setUserId(userId);  // 사용자 ID(닉네임) 업데이트
        sessionRepository.save(session);
        return SessionDto.fromEntity(session);
    }*/
}
