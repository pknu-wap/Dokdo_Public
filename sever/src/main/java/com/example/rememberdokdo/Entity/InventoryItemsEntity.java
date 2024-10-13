package com.example.rememberdokdo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "InventoryItems")
@Getter
@Setter
public class InventoryItemsEntity {
    @Id
    private Integer inventoryItemsId; // 인벤토리 아이템 식별자
    private Integer inventoryId; // 인벤토리 식별자
    private Integer itemsId; // 아이템 식별자
}
