package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.Stage4ProgressDto;
import com.example.rememberdokdo.Entity.Stage4ItemEntity;
import com.example.rememberdokdo.Entity.Stage4ProgressEntity;
import com.example.rememberdokdo.Repository.Stage4ItemRepository;
import com.example.rememberdokdo.Repository.Stage4ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class Stage4ProgressServiceC {

    @Autowired
    private final Stage4ProgressRepository stage4ProgressRepository;
    private final Stage4ItemRepository stage4ItemRepository;

    // 생성자를 통해 의존성 주입
    public Stage4ProgressServiceC(Stage4ProgressRepository stage4ProgressRepository, Stage4ItemRepository stage4ItemRepository) {
        this.stage4ProgressRepository = stage4ProgressRepository;
        this.stage4ItemRepository = stage4ItemRepository;
    }

    private void validateSessionId(String sessionId) {
        if (sessionId == null || sessionId.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Session ID cannot be null or empty");
        }
    }
    public Stage4ProgressDto startStage4(String sessionId) {
        validateSessionId(sessionId);
        // 데이터베이스에서 세션 ID로 진행 상태를 검색하거나 초기값으로 새로 생성
        Stage4ProgressEntity progress = stage4ProgressRepository.findBySessionId(sessionId)
                .orElseGet(() -> {
                    // Stage4ProgressEntity 초기화 및 저장
                    Stage4ProgressEntity newProgress = Stage4ProgressEntity.builder()
                            .sessionId(sessionId)
                            .isStage3Cleared(true) // Stage 3이 클리어되었다고 가정 (로직에 따라 변경 가능)
                            .currentMissionId(1)   // 첫 번째 미션으로 초기화
                            .remainingHearts(3)    // 기본 하트 수
                            .isCurrentMissionCleared(false)
                            .isGameOver(false)
                            .build();
                    return stage4ProgressRepository.save(newProgress); // 저장 후 반환
                });

        // 이미 Stage 4가 진행 중인지 확인
        if (progress.getCurrentMissionId() > 1 || progress.isGameOver()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Stage 4 is already in progress or game over");
        }

        // Stage 3 클리어 여부 확인
        if (!progress.isStage3Cleared()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Stage 3 not cleared");
        }

        // Stage 4 진행 상태 초기화
        progress.setCurrentMissionId(1); // 첫 번째 미션으로 초기화
        progress.setRemainingHearts(3);  // 하트 개수를 3개로 초기화
        progress.setCurrentMissionCleared(false); // 현재 미션을 클리어하지 않은 상태로 설정
        progress.setGameOver(false); // 게임 오버 상태 해제

        // 변경된 진행 상태를 데이터베이스에 저장
        try {
            stage4ProgressRepository.save(progress);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save progress", e);
        }

        // 변경된 엔티티를 DTO로 변환하여 반환
        return mapToDto(progress);
    }

    public Stage4ProgressDto attemptMission(String sessionId, int currentMissionId, String selectedItemName) {
        validateSessionId(sessionId);

        // 미션 ID 검증
        if (currentMissionId <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mission ID must be greater than 0");
        }

        // 데이터베이스에서 세션 ID로 진행 상태를 검색
        Stage4ProgressEntity progress = stage4ProgressRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid session ID"));

        // 게임 오버 상태 확인
        if (progress.isGameOver()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Game over");
        }

        // 현재 진행 중인 미션 번호와 요청된 미션 번호 비교
        if (progress.getCurrentMissionId() != currentMissionId) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid mission ID");
        }

        // 아이템 검증 로직: 사용자가 선택한 아이템이 올바른지 확인
        boolean missionCleared = stage4ItemRepository.findByRelatedMissionIdAndItemName(currentMissionId, selectedItemName)
                .map(Stage4ItemEntity::isCorrectItem) // 선택된 아이템이 정답인지 확인
                .orElse(false); // 아이템이 없으면 실패 처리

        if (missionCleared) {
            // **정답일 경우: 하트 감소 X**
            if (progress.getCurrentMissionId() < 3) {
                progress.setCurrentMissionId(progress.getCurrentMissionId() + 1); // 다음 미션으로 이동
            } else {
                // 마지막 미션 성공 시 미션 클리어 상태로 설정
                progress.setCurrentMissionCleared(true);
            }
        } else {
            // **오답일 경우: 하트 감소 O**
            progress.setRemainingHearts(progress.getRemainingHearts() - 1); // 남은 하트 감소
            if (progress.getRemainingHearts() <= 0) {
                progress.setGameOver(true); // 하트가 0개 이하로 감소하면 게임 오버
            }
        }

        // 변경된 진행 상태를 데이터베이스에 저장
        try {
            stage4ProgressRepository.save(progress);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save progress", e);
        }

        // 변경된 엔티티를 DTO로 변환하여 반환
        return mapToDto(progress);
    }

    public Stage4ProgressDto getStatus(String sessionId) {
        validateSessionId(sessionId);
        // 세션 ID를 사용하여 진행 상태를 데이터베이스에서 검색
        Stage4ProgressEntity progress = stage4ProgressRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid session ID"));

        // 진행 상태를 DTO로 변환하여 반환
        return mapToDto(progress);
    }

    private Stage4ProgressDto mapToDto(Stage4ProgressEntity entity) {
        if (entity == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Entity mapping failed: progress entity is null.");
        }

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
