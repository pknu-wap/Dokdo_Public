package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.PuzzleGameResultDto;
import com.example.rememberdokdo.Dto.Stage4ProgressDto;
import com.example.rememberdokdo.Entity.Inventory.InventoryEntity;
import com.example.rememberdokdo.Entity.Stage4ProgressEntity;
import com.example.rememberdokdo.Repository.Inventory.InventoryItemsRepository;
import com.example.rememberdokdo.Repository.Inventory.InventoryRepository;
import com.example.rememberdokdo.Repository.SessionRepository;
import com.example.rememberdokdo.Repository.Stage4ProgressRepository;
import com.example.rememberdokdo.Repository.StageProgressRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Stage4ProgressService {
    @Autowired
    private Stage4ProgressRepository stage4ProgressRepository;
    private Stage4ProgressEntity stage4ProgressEntity;
    @Autowired
    private StageProgressRepository stageProgressRepository;
    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private InventoryItemsRepository inventoryItemsRepository;
    @Autowired
    private SessionRepository sessionRepository;

    // 초기화(시작) 기능
    public Stage4ProgressDto startMission(Stage4ProgressDto stage4ProgressDto) {
        // sessionId 유효성 검사 => 아마도 필요없음
        // Stage3 클리어 여부 확인
        // Stage4 초기화 진행
        // DB에 새로운 Progress 정보 저장
        // 응답 Dto 반환
        return null;
    }

    // 미션 도전 기능
    public Stage4ProgressDto attemptMission(Stage4ProgressDto stage4ProgressDto) {
        // 세션 ID 유효성 검사
        // 현재 미션 ID 3인지 검사 => 3이면 진행 불가능
        // 미션 성공/실패 여부에 따른 처리(현재 미션 ID < 3)
        // 성공 -> 미션 번호 증가 : 다음 미션으로 이동
        //=> 미션 번호가 3일때, 성공하면 그대로 3으로 유지하고, 증가x(퍼즐 게임하게됨)
        // 실패 -> 하트 개수 감소
        // 하트 개수 = 0 이라면, 게임 오버 상태로 변경
        // DB에 변경된 Progress 정보 저장
        // 응답 Dto 반환
        return null;
    }

    // 상태 조회 기능
    public Stage4ProgressDto getStatus(Stage4ProgressDto stage4ProgressDto) {
        // 세션 ID 유효성 검사
        // 세션 ID에 대한 Stage4Progress 조회
        // Entity에서 Dto로 변환
        return null;
    }

    // 미션 재도전 기능
    @Transactional
    public Stage4ProgressDto retryMission(String sessionId, int currentMissionId, boolean isCurrentMissionCleared) {
        // 세션 ID 유효성 검사
        if (sessionId == null || sessionId.isEmpty()) {
            throw new IllegalArgumentException("세션이 만료되었거나 유효하지 않습니다.");
        }

        // DB에서 세션 ID로 최신 진행 상황 조회
        Optional<Stage4ProgressEntity> latestProgressOptional = stage4ProgressRepository.findLatestBySessionId(sessionId);
        if (latestProgressOptional.isEmpty()) {
            throw new IllegalArgumentException("세션 ID에 대한 스테이지4 진행 정보가 없습니다.");
        }

        // 최신 진행 상황 엔티티 저장
        Stage4ProgressEntity latestProgress = latestProgressOptional.get();

        // 남은 하트 검사 => 게임 오버
        if (latestProgress.getRemainingHearts() <= 0) {
            throw new IllegalArgumentException("남은 하트가 없으므로 게임 오버되었습니다.");
        }

        // 현재 미션 진행 가능 여부 확인
        if (latestProgress.isCurrentMissionCleared()) {
            throw new IllegalArgumentException("현재 미션을 이미 클리어했으므로 미션 진행이 불가능합니다.");
        }

        // 미션 재도전
        int remainingHearts = latestProgress.getRemainingHearts();
        boolean gameOver = false;

        if (!isCurrentMissionCleared) {
            remainingHearts--;
            if (remainingHearts <= 0) {
                gameOver = true;
            }
        }

        // 새로운 진행 상황 데이터 생성
        Stage4ProgressEntity newProgress = new Stage4ProgressEntity();
        newProgress.setSessionId(sessionId);
        newProgress.setStage3Cleared(true);
        newProgress.setCurrentMissionId(currentMissionId); // 현재 미션 번호
        newProgress.setRemainingHearts(remainingHearts); // 감소된 하트 반영
        newProgress.setCurrentMissionCleared(isCurrentMissionCleared); // 현재 미션 성공 여부
        newProgress.setGameOver(gameOver); // 게임 오버 상태 반영

        // 새로운 진행 상태를 저장
        stage4ProgressRepository.save(newProgress);

        // 응답 Dto 반환
        Stage4ProgressDto responseDto = new Stage4ProgressDto();
        responseDto.setProgressId(newProgress.getProgressId());
        responseDto.setSessionId(newProgress.getSessionId());
        responseDto.setCurrentMissionId(newProgress.getCurrentMissionId());
        responseDto.setRemainingHearts(newProgress.getRemainingHearts());
        responseDto.setCurrentMissionCleared(newProgress.isCurrentMissionCleared());
        responseDto.setGameOver(newProgress.isGameOver());

        return responseDto;
    }


    // 초기화(게임 오버) 기능
    @Transactional
    public Stage4ProgressDto resetStage4(String sessionId) {
        // 세션 ID 유효성 검사
        if (sessionId == null || sessionId.isEmpty()){
            throw new IllegalArgumentException("세션이 만료되었거나 유효하지 않습니다.");
        }

        // DB에서 기존 데이터 삭제(진행 상태 삭제)
        stage4ProgressRepository.deleteAllBySessionId(sessionId);

        // 새로운 초기화된 스테이지 4 상태 생성
        Stage4ProgressEntity newProgress = new Stage4ProgressEntity();
        newProgress.setSessionId(sessionId); // 기존 세션 ID
        newProgress.setStage3Cleared(true); // 스테이지3 클리어
        newProgress.setCurrentMissionId(1); // 첫 번째 미션부터 시작
        newProgress.setRemainingHearts(3); // 초기 하트 개수 = 3
        newProgress.setCurrentMissionCleared(false); // 현재 미션 클리어 여부
        newProgress.setGameOver(false); // 게임 오버 상태 초기화

        // DB에 새로운 Progress 정보 저장
        stage4ProgressRepository.save(newProgress);

        // 응답 Dto 반환
        Stage4ProgressDto responseDto = new Stage4ProgressDto();
        responseDto.setProgressId(newProgress.getProgressId());
        responseDto.setSessionId(newProgress.getSessionId());
        responseDto.setCurrentMissionId(newProgress.getCurrentMissionId());
        responseDto.setRemainingHearts(newProgress.getRemainingHearts());
        responseDto.setCurrentMissionCleared(newProgress.isCurrentMissionCleared());
        responseDto.setGameOver(newProgress.isGameOver());

        return responseDto;
    }

    // 퍼즐 게임 결과 처리 기능
    @Transactional
    public PuzzleGameResultDto PuzzleResult(String sessionId, boolean isPuzzleCleared) {
        // 세션 ID 유효성 검사
        if (sessionId == null || sessionId.isEmpty()) {
            throw new IllegalArgumentException("세션이 만료되었거나 유효하지 않습니다.");
        }

        // 현재 미션 상태 확인
        validatePuzzleGameEligiblity(sessionId);

        // 새로운 Dto 생성
        PuzzleGameResultDto responseDto = new PuzzleGameResultDto();
        responseDto.setSessionId(sessionId); // sessionId에 따라 한 번 생성

        // 인벤토리에서 세션 ID 조회
        InventoryEntity inventory = inventoryRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("인벤토리가 존재하지 않습니다."));
        int inventoryId = inventory.getInventoryId();

        // 퍼즐 게임 클리어 여부 처리
        Stage4ProgressEntity progressEntity;
        if (isPuzzleCleared) {
            // 퍼즐 게임 성공 => 세션 ID를 포함한 데이터 삭제
            deleteAllSessionData(sessionId, inventoryId); // 모든 관련 데이터 삭제
            // 성공 데이터 저장
            progressEntity = resetStage4Progress(sessionId, true, "방탈출에 성공하였습니다.");
            // 새로운 Dto에 방탈출 성공 메시지 추가
            responseDto.setPuzzleCleared(true);
            responseDto.setMessage("방탈출에 성공하였습니다.");

            // Stage4Progress 데이터 삭제
            stage4ProgressRepository.delete(progressEntity);
        } else {
            // 퍼즐 게임 실패 => 세션 ID에 대한 데이터 초기화(세션 ID 유지)
            deleteAllSessionDataExceptSession(sessionId, inventoryId); // 세션 제외한 모든 관련 데이터 삭제
            // 실패 데이터 저장
            progressEntity = resetStage4Progress(sessionId, false, "방탈출에 실패하였습니다.");
            // 새로운 Dto에 방탈출 실패 메시지 추가
            responseDto.setPuzzleCleared(false);
            responseDto.setMessage("방탈출에 실패하였습니다. 게임을 다시 시작해주세요.");

            // Stage4Progress 데이터 삭제
            stage4ProgressRepository.delete(progressEntity);
        }
        responseDto.setProgressId(progressEntity.getProgressId());
        return responseDto;
    }

    // 퍼즐 게임 진행 조건 확인
    private void validatePuzzleGameEligiblity(String sessionId) {
        Stage4ProgressEntity progress = stage4ProgressRepository.findLatestBySessionId(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("진행 상태를 찾을 수 없습니다."));

        // 현재 미션 ID가 3이고 현재 미션이 클리어 상태인지 확인
        if (progress.getCurrentMissionId() != 3 || !progress.isCurrentMissionCleared()) {
            throw new IllegalArgumentException("미션 3을 클리어하지 않았기 때문에 퍼즐 게임을 진행할 수 없습니다.");
        }
    }

    // 모든 세션 관련 데이터 삭제하는 메서드
    private void deleteAllSessionData(String sessionId, int inventoryId) {
        stageProgressRepository.deleteAllBySessionId(sessionId); // 스테이지 진행 상황 삭제
        stage4ProgressRepository.deleteAllBySessionId(sessionId); // 스테이지 4 진행 상황 삭제
        inventoryRepository.deleteBySessionId(sessionId); // 인벤토리 삭제
        inventoryItemsRepository.deleteAllByInventoryId(inventoryId); // 인벤토리 아이템 삭제
        sessionRepository.deleteBySessionId(sessionId); // 세션 삭제
    }

    // 세션 제외한 관련 데이터 삭제하는 메서드
    private void deleteAllSessionDataExceptSession(String sessionId, int inventoryId) {
        stageProgressRepository.deleteAllBySessionId(sessionId); // 스테이지 진행 상황 삭제
        stage4ProgressRepository.deleteAllBySessionId(sessionId); // 스테이지 4 진행 상황 삭제
        inventoryRepository.deleteBySessionId(sessionId); // 인벤토리 삭제
        inventoryItemsRepository.deleteAllByInventoryId(inventoryId); // 인벤토리 아이템 삭제
    }

    // 스테이지 4 진행 상황 초기화
    private Stage4ProgressEntity resetStage4Progress(String sessionId, boolean isPuzzleCleared, String message) {
        Stage4ProgressEntity newProgress = new Stage4ProgressEntity();
        newProgress.setSessionId(sessionId); // 기존 세션 ID
        newProgress.setStage3Cleared(true); // 스테이지3 클리어
        newProgress.setCurrentMissionId(1); // 첫 번째 미션부터 시작
        newProgress.setRemainingHearts(3); // 초기 하트 개수 = 3
        newProgress.setCurrentMissionCleared(false); // 현재 미션 클리어 여부
        newProgress.setGameOver(false); // 게임 오버 상태 초기화
        newProgress.setPuzzleCleared(isPuzzleCleared);
        newProgress.setMessage(message);

        // DB에 저장 후 반환
        return stage4ProgressRepository.save(newProgress);
    }
}