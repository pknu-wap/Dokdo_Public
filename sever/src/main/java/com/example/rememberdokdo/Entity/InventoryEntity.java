package com.example.rememberdokdo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

// 인벤토리 기능에 필요할 변수들
@Entity
@Getter
@Setter
public class InventoryEntity {
    @Id
    private Integer inventoryId; // 인벤토리 식별자 (고유키)
    private String sessionId; // 세션 식별자
}
