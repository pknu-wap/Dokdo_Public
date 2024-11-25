package com.example.rememberdokdo.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor // 생성자
@Builder
public class StageResetResponseDto {
    private int progressId;
    private String sessionId;
    private String message; // 게임 클리어 여부 메시지
}

