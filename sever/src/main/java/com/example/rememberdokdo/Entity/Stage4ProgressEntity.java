package com.example.rememberdokdo.Entity;

public class Stage4ProgressEntity {
    private int progressId; // PK
    private boolean isStage3Cleared;
    private int currentMissionId = 1;
    private int remainingHearts = 3;
    private boolean isCurrentMissionCleared = false;
    private boolean isGameOver = false;
    private String sessionId; // FK



}
