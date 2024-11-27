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


    // 초기화 기능
    @Transactional
    public StageResetResponseDto resetStage(String sessionId) {
        validateSessionId(sessionId); // 세션 ID 유효성 검사
        return progressStage(sessionId); // 스테이지 처리(4,5,6,7 공통 처리 로직)
    }

    // 세션 ID 유효성 검사
    private void validateSessionId(String sessionId) {
        if (sessionId == null || sessionId.isEmpty()) {
            throw new IllegalArgumentException("세션이 만료되었거나 유효하지 않습니다.");
        }
    }

    // 스테이지 초기화 처리
    private StageResetResponseDto progressStage(String sessionId){
        // 새로운 Dto 생성
        StageResetResponseDto responseDto = new StageResetResponseDto();
        responseDto.setSessionId(sessionId); // sessionId에 따라 한 번 생성

        InventoryEntity inventory = getInventoryBySessionId(sessionId); // 인벤토리 조회
        StageProgressEntity progressEntity; // 엔티티 생성
        deleteAllSessionData(sessionId, inventory.getInventoryId()); // 데이터 삭제

        progressEntity = resetStageProgress(sessionId, "게임이 종료되었습니다."); // 게임 종료 데이터 저장
        responseDto.setMessage("게임이 종료되었습니다."); // 새로운 Dto에 방탈출 게임 종료 메시지 추가

        responseDto.setProgressId(progressEntity.getProgressId());
        return responseDto;
    }

    // 인벤토리 조회
    private InventoryEntity getInventoryBySessionId(String sessionId) {
        return inventoryRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("인벤토리가 존재하지 않습니다."));
    }

    // 스테이지 진행 상황 초기화
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
        inventoryItemsRepository.deleteAllByInventoryId(inventoryId); // 인벤토리 아이템 삭제
        inventoryRepository.deleteBySessionId(sessionId); // 인벤토리 삭제
        sessionRepository.deleteBySessionId(sessionId); // 세션 삭제
    }
}
