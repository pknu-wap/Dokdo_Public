package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.Stage4ProgressDto;
import com.example.rememberdokdo.Entity.Stage4ProgressEntity;
import com.example.rememberdokdo.Repository.Stage4ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Stage4ProgressServiceC {

    @Autowired
    private Stage4ProgressRepository stage4ProgressRepository;

    public Stage4ProgressDto startStage4(String sessionId) {
        // 세션 확인
        Stage4ProgressEntity progress = stage4ProgressRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Session ID not found or invalid: " + sessionId));

        // Stage 3 클리어 여부 확인
        if (!progress.isStage3Cleared()) {
            throw new IllegalArgumentException("Stage 3 not cleared");
        }

        // 초기화
        progress.setCurrentMissionId(1);
        progress.setRemainingHearts(3);
        progress.setCurrentMissionCleared(false);
        progress.setGameOver(false);

        // 저장
        stage4ProgressRepository.save(progress);

        // DTO 반환
        return mapToDto(progress);
    }

    private Stage4ProgressDto mapToDto(Stage4ProgressEntity entity) {
        return Stage4ProgressDto.builder()
                .progressId(entity.getProgressId())
                .sessionId(entity.getSessionId())
                .currentMissionId(entity.getCurrentMissionId())
                .remainingHearts(entity.getRemainingHearts())
                .isCurrentMissionCleared(entity.isCurrentMissionCleared())
                .isGameOver(entity.isGameOver())
                .build();
    }
}
