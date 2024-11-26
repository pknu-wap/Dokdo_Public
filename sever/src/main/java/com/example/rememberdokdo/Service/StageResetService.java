package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.StageResetResponseDto;
import com.example.rememberdokdo.Entity.Inventory.InventoryEntity;
import com.example.rememberdokdo.Entity.StageProgressEntity;
import com.example.rememberdokdo.Repository.Inventory.InventoryItemsRepository;
import com.example.rememberdokdo.Repository.Inventory.InventoryRepository;
import com.example.rememberdokdo.Repository.SessionRepository;
import com.example.rememberdokdo.Repository.StageProgressRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StageResetService {
    @Autowired
    private StageProgressRepository stageProgressRepository;
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private InventoryItemsRepository inventoryItemsRepository;


    // 초기화(게임 오버, 클리어) 기능
    @Transactional
    public StageResetResponseDto resetStage(String sessionId, int stageId) {
        validateSessionId(sessionId);
        validateStageId(stageId);

        // Stage 4, 5, 6 처리 (공통 처리 로직)
        if (stageId == 4 || stageId == 5 || stageId == 6) {
            return progressStage456(sessionId);
        }
        // Stage 7 (퍼즐 게임) 처리
        else if (stageId == 7) {
            return progressStage7(sessionId, stageId);
        }

        throw new IllegalArgumentException("알 수 없는 스테이지 ID입니다.");
    }

    // 세션 ID 유효성 검사
    private void validateSessionId(String sessionId) {
        if (sessionId == null || sessionId.isEmpty()) {
            throw new IllegalArgumentException("세션이 만료되었거나 유효하지 않습니다.");
        }
    }

    // 초기화 불가능한 스테이지 ID 검증
    private void validateStageId(int stageId) {
        if (stageId == 1 || stageId == 2 || stageId == 3) {
            throw new IllegalArgumentException("해당 스테이지는 초기화할 수 없습니다.");
        }
    }

    // stage 4,5,6 처리(남은 하트 수 기반)
    private StageResetResponseDto progressStage456(String sessionId){
        // 새로운 Dto 생성
        StageResetResponseDto responseDto = new StageResetResponseDto();
        responseDto.setSessionId(sessionId); // sessionId에 따라 한 번 생성

        InventoryEntity inventory = getInventoryBySessionId(sessionId);
        StageProgressEntity progressEntity = getLatestStageProgress(sessionId);

        validateStageResetConditions(progressEntity);

        // 조건 충족 : 데이터 삭제
        deleteAllSessionData(sessionId, inventory.getInventoryId()); // 모든 관련 데이터 삭제

        // 실패 메시지와 함께 새로운 진행 상태 저장
        progressEntity = resetStageProgress(sessionId, "하트를 모두 소진하여 방탈출에 실패하였습니다.");

        // 응답 Dto에 데이터 설정
        responseDto.setMessage("하트를 모두 소진하여 방탈출에 실패하였습니다.");
        responseDto.setProgressId(progressEntity.getProgressId());

        return responseDto;
    }

    // 스테이지7(퍼즐 게임) 처리
    private StageResetResponseDto progressStage7(String sessionId, int stageId){
        // 새로운 Dto 생성
        StageResetResponseDto responseDto = new StageResetResponseDto();
        responseDto.setSessionId(sessionId); // sessionId에 따라 한 번 생성

        InventoryEntity inventory = getInventoryBySessionId(sessionId);
        StageProgressEntity stageProgress = getStageProgressBySessionAndStage(sessionId, stageId);

        // 스테이지 7 진입 전 남은 하트 수 검증
        checkRemainingHearts(stageProgress.getRemainingHearts());

        StageProgressEntity progressEntity;

        // 조건 충족 : 데이터 삭제
        deleteAllSessionData(sessionId, inventory.getInventoryId());
        if (stageProgress.isCleared()) {
            // 성공 데이터 저장
            progressEntity = resetStageProgress(sessionId, "퍼즐 게임을 클리어하여 방탈출에 성공하였습니다.");
            // 새로운 Dto에 방탈출 성공 메시지 추가
            responseDto.setMessage("퍼즐 게임을 클리어하여 방탈출에 성공하였습니다.");
        } else {
            // 실패 데이터 저장
            progressEntity = resetStageProgress(sessionId, "퍼즐 게임을 시간 안에 클리어하지 못 해 방탈출에 실패하였습니다.");
            // 새로운 Dto에 방탈출 실패 메시지 추가
            responseDto.setMessage("퍼즐 게임을 시간 안에 클리어하지 못 해 방탈출에 실패하였습니다.");
        }
        responseDto.setProgressId(progressEntity.getProgressId());
        return responseDto;
    }

    // 남은 하트 수 확인
    private void checkRemainingHearts(int remainingHearts){
        if (remainingHearts <= 0) {
            throw new IllegalArgumentException("남은 하트가 0개이므로 스테이지 7에 진입할 수 없습니다.");
        }
    }

    // 인벤토리 조회
    private InventoryEntity getInventoryBySessionId(String sessionId) {
        return inventoryRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("인벤토리가 존재하지 않습니다."));
    }

    // 최신 스테이지 진행 상황 조회
    private StageProgressEntity getLatestStageProgress(String sessionId) {
        return stageProgressRepository.findLatestBySessionId(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("스테이지 진행 정보가 존재하지 않습니다."));
    }

    // 특정 스테이지 진행 상황 조회
    private StageProgressEntity getStageProgressBySessionAndStage(String sessionId, int stageId) {
        return stageProgressRepository.findBySessionIdAndStageId(sessionId, stageId)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 스테이지 상태입니다. 세션 ID 또는 스테이지 ID를 확인해주세요."));
    }

    // 초기화 조건 검증 => 하트 수가 0개이고, isCleared가 false
    private void validateStageResetConditions(StageProgressEntity progressEntity) {
        if (progressEntity.getRemainingHearts() > 0) {
            throw new IllegalArgumentException("하트가 남아있어 초기화할 수 없습니다.");
        }

        if (progressEntity.isCleared()) {
            throw new IllegalArgumentException("현재 스테이지가 클리어된 상태여서 초기화할 수 없습니다.");
        }
    }

    // 스테이지 4 진행 상황 초기화
    private StageProgressEntity resetStageProgress(String sessionId, String message) {
        StageProgressEntity newProgress = new StageProgressEntity();
        newProgress.setSessionId(sessionId); // 기존 세션 ID
        newProgress.setStageId(1);
        newProgress.setCleared(false);
        newProgress.setRemainingHearts(3); // 초기 하트 개수 = 3
        newProgress.setMessage(message);

        // DB에 저장 후 반환
        return stageProgressRepository.save(newProgress);
    }

    // 모든 세션 관련 데이터 삭제하는 메서드
    private void deleteAllSessionData(String sessionId, int inventoryId) {
        stageProgressRepository.deleteAllBySessionId(sessionId); // 스테이지 진행 상황 삭제
        inventoryRepository.deleteBySessionId(sessionId); // 인벤토리 삭제
        inventoryItemsRepository.deleteAllByInventoryId(inventoryId); // 인벤토리 아이템 삭제
        sessionRepository.deleteBySessionId(sessionId); // 세션 삭제
    }
}
