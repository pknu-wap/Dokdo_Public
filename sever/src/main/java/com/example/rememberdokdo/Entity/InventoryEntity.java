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
    private Long sessionId; // 세션 식별자
    private Long itemId; // 아이템 식별자
    private String itemName; // 아이템 이름
    private String itemDescription; // 아이템 설명
}
