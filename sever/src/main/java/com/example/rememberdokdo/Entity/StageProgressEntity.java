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
    private String sessionId;

    @Column(name = "stageId", nullable = false)
    private int stageId;

    @Column(name = "isCleared", nullable = false)
    private boolean isCleared;
}
