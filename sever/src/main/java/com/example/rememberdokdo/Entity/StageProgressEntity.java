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
@Table(name = "StageProgress")
public class StageProgressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "progressId") // 컬럼 이름 명시
    private int progressId; // progressId로 이름 변경

    @Column(name = "sessionId", nullable = false)
    private String sessionId; // 세션 ID

    @Column(name = "stageId", nullable = false)
    private int stageId; // 스테이지 ID

    @Column(name = "isCleared", nullable = false)
    private boolean isCleared; // 스테이지 클리어 여부

    @Column(nullable = false)
    private int remainingHearts=3; // 남은 하트 추가

    @Column(nullable = false)
    private boolean gameOver; // 게임 오버

    @Column(nullable = true)
    private String message; // 게임 클리어, 게임 오버 메시지 추가
}
