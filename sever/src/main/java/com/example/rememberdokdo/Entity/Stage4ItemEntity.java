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
@Table(name = "Stage4Item")
public class Stage4ItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId; // 아이템 ID (Primary Key)

    @Column(nullable = false)
    private String itemName; // 아이템 이름

    @Column(length = 500)
    private String itemDescription; // 아이템 설명

    @Column(nullable = false)
    private int relatedMissionId; // 관련된 미션 ID

    @Column(nullable = false)
    private boolean isCorrectItem; // 정답 여부
}
