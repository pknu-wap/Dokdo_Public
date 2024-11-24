package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.Stage4ProgressDto;
import com.example.rememberdokdo.Dto.StageProgressResponseDto;
import com.example.rememberdokdo.Entity.StageProgressEntity;
import com.example.rememberdokdo.Repository.StageProgressRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StageResetService {
    @Autowired
    private StageProgressRepository stageProgressRepository;


    // 초기화(게임 오버, 클리어) 기능
    @Transactional
    public StageProgressResponseDto resetStage(int stageId, String sessionId) {
        // 세션 ID 유효성 검사
        if (sessionId == null || sessionId.isEmpty()) {
            throw new IllegalArgumentException("세션이 만료되었거나 유효하지 않습니다.");
        }

        // stageId가 1,2,3인 경우 에러 처리
        if (stageId == 1 || stageId == 2 || stageId == 3) {
            throw new IllegalArgumentException("해당 스테이지는 초기화할 수 없습니다.");
        }

        // stage 4,5,6 처리(남은 하트 수 기반)
        if (stageId == 4 || stageId == 5 || stageId == 6) {
            // 진행 상황 조회
            Optional<StageProgressEntity> stageProgressOpt = stageProgressRepository.findBySessionIdAndStageId(sessionId, stageId);
            // 진행 상황 없을 경우 에러 처리
            if (stageProgressOpt.isEmpty()) {
                throw new IllegalArgumentException("해당 스테이지의 진행 상황을 찾을 수 없습니다.");
            }
            StageProgressEntity stageProgress = stageProgressOpt.get();

            // 하트 수가 0이면 게임 오버
            if (stageProgress.getRemainingHearts() == 0) {
                // 모든 세션 관련 정보 삭제
                stageProgressRepository.deleteAllBySessionId(sessionId);
                return StageProgressResponseDto.builder()
                        .sessionId(sessionId)
                        .remainingHearts(0)
                        .isCleared(false) // 게임 오버로 클리어 실패
                        .build();
            }
            // 남은 하트가 있을 경우 에러 처리
            throw new IllegalArgumentException("하트 수가 남아있어 게임을 초기화할 수 없습니다.");
        }

        // 모든 스테이지의 진행 상황 처리 메서드
        // 하트 기반 스테이지 처리(스테이지4,5,6)
        // 스테이지7 처리
        // 진행 상태 포함한 DTO 생성
        // 세션 관련 모든 데이터 삭제
    }
}
