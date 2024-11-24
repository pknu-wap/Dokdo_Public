package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.Stage4ProgressDto;
import com.example.rememberdokdo.Dto.StageProgressResponseDto;
import com.example.rememberdokdo.Repository.StageProgressRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        // 모든 스테이지의 진행 상황 처리 메서드
        // 하트 기반 스테이지 처리(스테이지4,5,6)
        // 스테이지7 처리
        // 진행 상태 포함한 DTO 생성
        // 세션 관련 모든 데이터 삭제
    }
}
