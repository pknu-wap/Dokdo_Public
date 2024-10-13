package com.example.rememberdokdo.Dto.Inventory;

import lombok.Data;

@Data
public class ItemDeleteRequestDto {
    private Integer inventoryId; // 인벤토리 식별자
    private Integer itemId; // 아이템 식별자
}
