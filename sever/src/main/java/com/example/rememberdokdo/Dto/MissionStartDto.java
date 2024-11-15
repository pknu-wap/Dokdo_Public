package com.example.rememberdokdo.Dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MissionStartDto {
    private int progressId;
    private String sessionId;
    private int currentMissionId;
    private int remainingHearts;
    private boolean isCurrentMissionCleared;
    private boolean isGameOver;

    public MissionStartDto(int progressId, String sessionId, int currentMissionId, int remainingHearts, boolean isCurrentMissionCleared, boolean isGameOver) {
        this.progressId = progressId;
        this.sessionId = sessionId;
        this.currentMissionId = currentMissionId;
        this.remainingHearts = remainingHearts;
        this.isCurrentMissionCleared = isCurrentMissionCleared;
        this.isGameOver = isGameOver;
    }
}

