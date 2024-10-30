package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.StageDto;
import com.example.rememberdokdo.Entity.StageProgressEntity;
import com.example.rememberdokdo.Repository.StageProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StageService {

    @Autowired
    private StageProgressRepository stageProgressRepository;

    // 특정 스테이지에 접근할 수 있는지 확인
    public StageDto checkStageAccess(String sessionId, int stageId) {
        // 스테이지 ID가 1부터 4 사이일 경우 접근 가능
        boolean isAccessible = stageId >= 1 && stageId <= 4;

        // 현재 스테이지 클리어 여부 확인
        boolean isCleared = stageProgressRepository.findBySessionIdAndStageId(sessionId, stageId)
                .map(StageProgressEntity::isCleared)
                .orElse(false);

        return new StageDto(stageId, isAccessible, isCleared);
    }

    // 스테이지 클리어 상태 저장
    public void clearStage(String sessionId, int stageId) {
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
    }
}

