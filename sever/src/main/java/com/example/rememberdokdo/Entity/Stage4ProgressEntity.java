package com.example.rememberdokdo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Stage4Progress")
public class Stage4ProgressEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int progressId; // PK
    private boolean isStage3Cleared;
    private int currentMissionId = 1;
    private int remainingHearts = 3;
    private boolean isCurrentMissionCleared = false;
    private boolean isPuzzleCleared = false;
    private boolean isGameOver = false;
    private String message; // 게임 클리어 여부 메시지
    @Column(nullable = false, unique = true)
    private String sessionId; // FK
}
