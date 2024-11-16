package com.example.rememberdokdo.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor // 생성자
public class MissionStartDto {
    private int progressId;
    private String sessionId;
    private int currentMissionId;
    private int remainingHearts;
    private boolean isCurrentMissionCleared;
    private boolean isGameOver;
}

