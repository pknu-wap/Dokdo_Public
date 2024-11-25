package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.SessionProgressDto;
import com.example.rememberdokdo.Dto.StageDto;
import com.example.rememberdokdo.Dto.StageProgressResponseDto;
import com.example.rememberdokdo.Entity.Stage4ItemEntity;
import com.example.rememberdokdo.Entity.StageProgressEntity;
import com.example.rememberdokdo.Repository.Stage4ItemRepository;
import com.example.rememberdokdo.Repository.StageProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class StageService {

    @Autowired
    private StageProgressRepository stageProgressRepository;
    @Autowired
    private Stage4ItemRepository stage4ItemRepository;

    public StageDto checkStageAccess(String sessionId, int stageId) {
        // 기본적으로 스테이지 ID가 1부터 7 사이일 경우 접근 가능 설정
        boolean isAccessible = stageId >= 1 && stageId <= 7;

        // 스테이지 1부터 현재 스테이지 직전까지 모두 클리어 상태인지 확인
        boolean isStage1Cleared = stageProgressRepository.findBySessionIdAndStageId(sessionId, 1)
                .map(StageProgressEntity::isCleared)
                .orElse(false);

        // 스테이지 1을 클리어한 경우 2, 3, 4, 5, 6, 7 스테이지도 접근 가능
        if (isStage1Cleared) {
            isAccessible = stageId >= 1 && stageId <= 7;
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
    // 스테이지 1이 클리어되지 않은 상태에서 2, 3, 4를 시도할 경우 예외 처리
        if (stageId >= 2 && stageId <= 4) {
            boolean isStage1Cleared = stageProgressRepository.findBySessionIdAndStageId(sessionId, 1)
                    .map(StageProgressEntity::isCleared)
                    .orElse(false);

            if (!isStage1Cleared) {
                throw new IllegalStateException("스테이지 1을 클리어하고 오세요.");
            }
        }

        // 스테이지 4를 클리어하려는 경우, 1, 2, 3의 클리어 상태 확인
        if (stageId == 4) {
            for (int i = 1; i <= 3; i++) {
                boolean isCleared = stageProgressRepository.findBySessionIdAndStageId(sessionId, i)
                        .map(StageProgressEntity::isCleared)
                        .orElse(false);

                if (!isCleared) {
                    throw new IllegalStateException("스테이지 " + i + "가 클리어되지 않았습니다.");
                }
            }
        }

        // 스테이지 클리어 처리
        StageProgressEntity stageProgress = stageProgressRepository
                .findBySessionIdAndStageId(sessionId, stageId)
                .orElseGet(() -> StageProgressEntity.builder()
                        .sessionId(sessionId)
                        .stageId(stageId)
                        .isCleared(true)
                        .build());

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
        responseDto.setStages(List.of(new SessionProgressDto.StageStatus(stageId, true, null)));


        return responseDto;
    }

    //스테이지 4,5,6 미션 도전 처리
    public StageProgressResponseDto processItem(String sessionId, int stageId, String selectedItem) {
        // 이미 클리어된 스테이지인지 확인
        boolean isAlreadyCleared = stageProgressRepository.findBySessionIdAndStageId(sessionId, stageId)
                .map(StageProgressEntity::isCleared)
                .orElse(false);

        if (isAlreadyCleared) {
            throw new IllegalStateException("이미 클리어된 스테이지입니다.");
        }

        // 이전 스테이지의 상태에서 남은 하트를 가져오거나, 기본값 3 설정 (스테이지 4는 무조건 기본값 3)
        int previousHearts;
        if (stageId == 4) {
            previousHearts = 3; // 스테이지 4는 항상 기본값 3
        } else {
            previousHearts = stageProgressRepository.findBySessionId(sessionId).stream()
                    .filter(progress -> progress.getStageId() < stageId) // 현재 스테이지보다 낮은 스테이지만 고려
                    .sorted(Comparator.comparingInt(StageProgressEntity::getStageId).reversed()) // 최근 스테이지 우선
                    .findFirst() // 가장 최근 상태
                    .map(StageProgressEntity::getRemainingHearts)
                    .orElse(3); // 이전 상태가 없으면 기본값 3
        }

        // 스테이지 진행 상태 가져오기 또는 새로운 상태 생성
        StageProgressEntity stageProgress = stageProgressRepository
                .findBySessionIdAndStageId(sessionId, stageId)
                .orElseGet(() -> {
                    // 새 진행 상태 생성
                    StageProgressEntity newProgress = StageProgressEntity.builder()
                            .sessionId(sessionId)
                            .stageId(stageId)
                            .remainingHearts(previousHearts)
                            .isCleared(false)
                            .gameOver(false)
                            .build();
                    stageProgressRepository.save(newProgress);
                    return newProgress;
                });

        // 게임 오버 상태 확인
        if (stageProgress.isGameOver()) {
            throw new IllegalStateException("게임 오버 상태입니다. 더 이상 진행할 수 없습니다.");
        }

        // 정답 여부 확인
        boolean isCorrect = stage4ItemRepository.findByRelatedMissionIdAndItemName(stageId, selectedItem)
                .map(Stage4ItemEntity::isCorrectItem)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 아이템 이름입니다."));

        if (isCorrect) {
            // 정답 처리: 스테이지 클리어
            stageProgress.setCleared(true);
        } else {
            // 오답 처리: 하트 감소
            int remainingHearts = stageProgress.getRemainingHearts() - 1;
            stageProgress.setRemainingHearts(remainingHearts);
            if (remainingHearts <= 0) {
                stageProgress.setGameOver(true); // 하트가 0이 되면 게임 오버
            }
        }

        // 상태 저장
        stageProgressRepository.save(stageProgress);

        // 응답 반환
        return StageProgressResponseDto.builder()
                .progressId(stageProgress.getProgressId())
                .sessionId(sessionId)
                .remainingHearts(stageProgress.getRemainingHearts())
                .isCleared(stageProgress.isCleared())
                .build();
    }

    //GET 각 스테이지 정보 조회
    public StageProgressResponseDto getStageStatus(String sessionId, int stageId) {
        // 스테이지 정보를 조회
        StageProgressEntity stageProgress = stageProgressRepository
                .findBySessionIdAndStageId(sessionId, stageId)
                .orElse(null);

        if (stageProgress == null) {
            int initialHearts = 3; // 기본 하트 수

            if (stageId > 4) {
                // 이전 스테이지 정보 조회
                StageProgressEntity previousStage = stageProgressRepository.findBySessionIdAndStageId(sessionId, stageId - 1)
                        .orElseThrow(() -> new IllegalArgumentException("스테이지 진행 정보가 없습니다. "));

                if (previousStage == null || !previousStage.isCleared()) {
                    // 이전 스테이지가 클리어되지 않은 경우 예외 발생
                    throw new IllegalArgumentException("이전 스테이지를 클리어하지 않았습니다. sessionId: " + sessionId + ", stageId: " + (stageId - 1));
                }

                // 이전 스테이지 클리어 시 남은 하트를 그대로 가져옴
                initialHearts = previousStage.getRemainingHearts();
            }

            return StageProgressResponseDto.builder()
                    .progressId(null)
                    .sessionId(sessionId)
                    .remainingHearts(initialHearts)
                    .isCleared(false)
                    .build();
        }

        // 기존 스테이지가 존재하면 해당 정보를 반환
        return StageProgressResponseDto.builder()
                .progressId(stageProgress.getProgressId())
                .sessionId(sessionId)
                .remainingHearts(stageProgress.getRemainingHearts())
                .isCleared(stageProgress.isCleared())
                .build();
    }

    // 전체 세션 상태 조회
    public SessionProgressDto getSessionStatus(String sessionId) {
        List<StageProgressEntity> stages = stageProgressRepository.findBySessionId(sessionId);
        List<SessionProgressDto.StageStatus> stageStatuses = stages.stream()
                .map(stage -> new SessionProgressDto.StageStatus(
                        stage.getStageId(),
                        stage.isCleared(),
                        stage.getRemainingHearts() // 하트 상태 포함
                ))
                .toList();

        return SessionProgressDto.builder()
                .sessionId(sessionId)
                .stages(stageStatuses)
                .expiresAt(LocalDateTime.now().plusHours(1)) // 예시 만료 시간
                .isActive(true)
                .build();
    }

    public SessionProgressDto clearStageForStage7(String sessionId) {
        // 이전 스테이지(스테이지 6)의 하트 값 가져오기
        int remainingHearts = stageProgressRepository.findBySessionIdAndStageId(sessionId, 6)
                .map(StageProgressEntity::getRemainingHearts)
                .orElse(3); // 기본값 3 사용

        // 스테이지 7 데이터 처리
        StageProgressEntity stageProgress = stageProgressRepository
                .findBySessionIdAndStageId(sessionId, 7)
                .orElseGet(() -> StageProgressEntity.builder()
                        .sessionId(sessionId)
                        .stageId(7)
                        .remainingHearts(remainingHearts)
                        .isCleared(false)
                        .build());

        // 스테이지 7 클리어 처리
        stageProgress.setCleared(true);
        stageProgress.setRemainingHearts(remainingHearts); // 명시적으로 하트 값 저장
        stageProgressRepository.save(stageProgress);

        // 응답 객체 생성
        SessionProgressDto responseDto = new SessionProgressDto();
        responseDto.setSessionId(sessionId);
        responseDto.setIsActive(true);
        responseDto.setExpiresAt(LocalDateTime.now().plusHours(1));
        responseDto.setStages(List.of(new SessionProgressDto.StageStatus(7, true, remainingHearts)));

        return responseDto;
    }



}
