package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.SessionDto;
import com.example.rememberdokdo.Dto.SessionProgressDto;
import com.example.rememberdokdo.Entity.SessionEntity;
import com.example.rememberdokdo.Entity.StageProgressEntity;
import com.example.rememberdokdo.Repository.SessionRepository;
import com.example.rememberdokdo.Repository.StageProgressRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class SessionService {

    private static final Logger logger = LoggerFactory.getLogger(SessionService.class);

    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private StageProgressRepository stageProgressRepository;

    // 세션 시작 메서드
    public SessionDto startSession(HttpServletRequest request, HttpServletResponse response) {
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

        if (sessionId != null && validateSession(sessionId)) {
            sessionRepository.deleteById(sessionId);
        }

        sessionId = UUID.randomUUID().toString();
        createSessionCookie(sessionId, response);

        SessionEntity sessionEntity = SessionEntity.builder()
                .sessionId(sessionId)
                .userId(null)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusHours(1))
                .isActive(true)
                .build();

        sessionRepository.save(sessionEntity);

        return SessionDto.fromEntity(sessionEntity);
    }

    // 세션 유효성 확인
    public boolean validateSession(String sessionId) {
        SessionEntity session = sessionRepository.findById(sessionId).orElse(null);
        if (session == null) {
            return false;
        }

        // 세션이 만료되지 않았고 활성화된 상태로 고정
        session.setIsActive(true);  // 항상 활성 상태로 유지
        session.setExpiresAt(LocalDateTime.now().plusHours(1));  // 만료 시간 갱신 (1시간 연장)
        sessionRepository.save(session);  // 변경사항 저장

        return true;
    }


    // 세션 갱신
    public SessionDto refreshSession(HttpServletRequest request, HttpServletResponse response) {
        String sessionId = UUID.randomUUID().toString();
        createSessionCookie(sessionId, response);

        SessionEntity sessionEntity = SessionEntity.builder()
                .sessionId(sessionId)
                .userId(null)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusHours(1))
                .isActive(true)
                .build();

        sessionRepository.save(sessionEntity);

        return SessionDto.fromEntity(sessionEntity);
    }

    // 쿠키 생성
    private void createSessionCookie(String sessionId, HttpServletResponse response) {
        Cookie sessionCookie = new Cookie("SESSIONID", sessionId);
        sessionCookie.setMaxAge(3600);
        sessionCookie.setHttpOnly(true);
        sessionCookie.setPath("/");
        response.addCookie(sessionCookie);
    }

    // 만료된 세션 삭제
    @Scheduled(fixedRate = 3600000)
    public void deleteExpiredSessions() {
        try {
            int deletedCount = sessionRepository.deleteByExpiresAtBefore(LocalDateTime.now());
            logger.info("만료된 세션 삭제 완료: 삭제된 세션 수 = {}", deletedCount);
        } catch (Exception e) {
            logger.error("만료된 세션 삭제 실패", e);
        }
    }

    public SessionProgressDto getSessionStatus(String sessionId) {
        // 세션 정보 확인
        SessionEntity sessionEntity = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));

        // 최신 스테이지 진행 상황 조회
        List<SessionProgressDto.StageStatus> stages = stageProgressRepository.findBySessionId(sessionId).stream()
                .map(stage -> new SessionProgressDto.StageStatus(stage.getStageId(), stage.isCleared()))
                .collect(Collectors.toList());

        return new SessionProgressDto(
                sessionEntity.getSessionId(),
                sessionEntity.getUserId(),
                stages,
                null // 인벤토리 아이템은 필요 시 설정
        );
    }

    // 스테이지 완료 처리
    @Transactional
    public void completeStage(String sessionId, int stageId) {
        // sessionId와 stageId로 스테이지 진행 상태 조회
        StageProgressEntity stageProgress = stageProgressRepository.findBySessionIdAndStageId(sessionId, stageId)
                .orElse(StageProgressEntity.builder()
                        .sessionId(sessionId)
                        .stageId(stageId)
                        .isCleared(false)  // 기본값은 false로 설정
                        .build());

        /// 상태를 true로 변경하고 저장
        stageProgress.setCleared(true);
        stageProgressRepository.save(stageProgress); // 저장
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
