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
        // 데이터베이스에서 세션 ID로 진행 상태를 검색
        Stage4ProgressEntity progress = stage4ProgressRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Session ID not found or invalid: " + sessionId));

        // Stage 3 클리어 여부 확인
        if (!progress.isStage3Cleared()) {
            throw new IllegalArgumentException("Stage 3 not cleared");
        }

        // Stage 4 진행 상태 초기화
        progress.setCurrentMissionId(1); // 첫 번째 미션으로 초기화
        progress.setRemainingHearts(3);  // 하트 개수를 3개로 초기화
        progress.setCurrentMissionCleared(false); // 현재 미션을 클리어하지 않은 상태로 설정
        progress.setGameOver(false); // 게임 오버 상태 해제

        // 변경된 진행 상태를 데이터베이스에 저장
        stage4ProgressRepository.save(progress);

        // 변경된 엔티티를 DTO로 변환하여 반환
        return mapToDto(progress);
    }

    public Stage4ProgressDto attemptMission(String sessionId, int currentMissionId) {
        // 데이터베이스에서 세션 ID로 진행 상태를 검색
        Stage4ProgressEntity progress = stage4ProgressRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("세션ID가 유효하지 않습니다: " + sessionId));

        // 게임 오버 상태 확인
        if (progress.isGameOver()) {
            throw new IllegalStateException("Game over. 미션을 시도할 수 없습니다.");
        }

        // 현재 진행 중인 미션 번호와 요청된 미션 번호 비교
        if (progress.getCurrentMissionId() != currentMissionId) {
            throw new IllegalArgumentException("Invalid mission ID. Current mission ID is: " + progress.getCurrentMissionId());
        }

        // 미션 성공 여부 결정 (50% 확률로 성공 처리)
        boolean missionCleared = Math.random() < 0.5;

        if (missionCleared) {
            // 미션 성공 처리
            if (progress.getCurrentMissionId() < 3) { // 현재 미션이 마지막 미션이 아니라면
                progress.setCurrentMissionId(progress.getCurrentMissionId() + 1); // 다음 미션으로 이동
            } else {
                // 마지막 미션 성공 시 미션 클리어 상태로 설정
                progress.setCurrentMissionCleared(true);
            }
        } else {
            // 미션 실패 처리
            progress.setRemainingHearts(progress.getRemainingHearts() - 1); // 남은 하트 감소
            if (progress.getRemainingHearts() <= 0) {
                progress.setGameOver(true); // 하트가 0개 이하로 감소하면 게임 오버
            }
        }

        // 변경된 진행 상태를 데이터베이스에 저장
        stage4ProgressRepository.save(progress);

        // 변경된 엔티티를 DTO로 변환하여 반환
        return mapToDto(progress);
    }

    public Stage4ProgressDto getStatus(String sessionId) {
        // 세션 ID를 사용하여 진행 상태를 데이터베이스에서 검색
        Stage4ProgressEntity progress = stage4ProgressRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("세션ID가 유효하지 않습니다: " + sessionId));

        // 진행 상태를 DTO로 변환하여 반환
        return mapToDto(progress);
    }

    private Stage4ProgressDto mapToDto(Stage4ProgressEntity entity) {
        return Stage4ProgressDto.builder()
                .progressId(entity.getProgressId()) // 진행 ID
                .sessionId(entity.getSessionId()) // 세션 ID
                .currentMissionId(entity.getCurrentMissionId()) // 현재 미션 ID
                .remainingHearts(entity.getRemainingHearts()) // 남은 하트 수
                .isCurrentMissionCleared(entity.isCurrentMissionCleared()) // 현재 미션 클리어 여부
                .isGameOver(entity.isGameOver()) // 게임 오버 여부
                .build();
    }
}
