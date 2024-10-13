package com.example.rememberdokdo.Entity.Inventory;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // Lombok이 자동으로 getter, setter, equals, hashcode, toString 등을 생성
@NoArgsConstructor // 기본 생성자 생성
@AllArgsConstructor // 모든 필드를 인자로 받는 생성자 생성
@Builder // 빌더 패턴을 사용할 수 있도록 함
@Table(name = "InventoryItems")
public class InventoryItemsEntity {
    @Id
    private Integer inventoryItemsId; // 인벤토리 아이템 식별자
    private Integer inventoryId; // 인벤토리 식별자
    private Integer itemsId; // 아이템 식별자
}
