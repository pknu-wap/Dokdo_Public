package com.example.rememberdokdo.Entity.Inventory;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

// 인벤토리 기능에 필요할 변수들
@Entity
@Table(name = "Inventory")
@Data
public class InventoryEntity {
    @Id
    private Integer inventoryId; // 인벤토리 식별자 (고유키)
    private String sessionId; // 세션 식별자
}
