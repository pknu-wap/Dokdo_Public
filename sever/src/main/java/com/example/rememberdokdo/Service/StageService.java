package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.SessionProgressDto;
import com.example.rememberdokdo.Dto.StageDto;
import com.example.rememberdokdo.Entity.StageProgressEntity;
import com.example.rememberdokdo.Repository.StageProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class StageService {

    @Autowired
    private StageProgressRepository stageProgressRepository;

    public StageDto checkStageAccess(String sessionId, int stageId) {
        // 기본적으로 스테이지 ID가 1부터 6 사이일 경우 접근 가능 설정
        boolean isAccessible = stageId >= 1 && stageId <= 6;

        // 스테이지 1의 클리어 여부 확인
        boolean isStage1Cleared = stageProgressRepository.findBySessionIdAndStageId(sessionId, 1)
                .map(StageProgressEntity::isCleared)
                .orElse(false);

        // 스테이지 1을 클리어한 경우 2, 3, 4, 5, 6 스테이지도 접근 가능
        if (isStage1Cleared) {
            isAccessible = stageId >= 1 && stageId <= 6;
        } else if (stageId > 1) {
            // 스테이지 1을 클리어하지 않았고 현재 요청 스테이지가 1보다 큰 경우 접근 불가
            isAccessible = false;
        }

        // 현재 스테이지의 클리어 여부 확인
        boolean isCleared = stageProgressRepository.findBySessionIdAndStageId(sessionId, stageId)
                .map(StageProgressEntity::isCleared)
                .orElse(false);

        return new StageDto(stageId, isAccessible, isCleared);
    }

    // 스테이지 클리어 상태 저장
    public SessionProgressDto clearStage(String sessionId, int stageId) {
        StageProgressEntity stageProgress = stageProgressRepository
                .findBySessionIdAndStageId(sessionId, stageId)
                .orElse(null);

        if (stageProgress == null) {
            // 새 엔티티 생성
            stageProgress = StageProgressEntity.builder()
                    .sessionId(sessionId)
                    .stageId(stageId)
                    .isCleared(true)
                    .build();
        } else {
            // 이미 존재하면 클리어 상태 업데이트
            stageProgress.setCleared(true);
        }
        stageProgressRepository.save(stageProgress);

        // 응답 객체 생성
        SessionProgressDto responseDto = new SessionProgressDto();
        responseDto.setSessionId(sessionId);
        responseDto.setIsActive(true); // 기본값 설정
        responseDto.setExpiresAt(LocalDateTime.now().plusHours(1)); // 예시로 만료 시간 설정
        responseDto.setStages(List.of(new SessionProgressDto.StageStatus(stageId, true)));

        return responseDto;
    }
}
