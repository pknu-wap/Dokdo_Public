package com.example.rememberdokdo.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StageProgressResponseDto {
    private int progressId;         // 진행 상태 ID
    private String sessionId;       // 세션 ID
    private int remainingHearts;    // 남은 하트
    private boolean isCleared;      // 스테이지 클리어 여부
}
