package com.example.rememberdokdo.Dto.Inventory;

import lombok.Data;

@Data
public class ItemDeleteResponseDto {
    private Integer itemId; // 아이템 식별자
    private String itemName; // 아이템 이름
    private String itemDescription; // 아이템 설명

    // 생성자 추가
    public ItemDeleteResponseDto(Integer itemId, String itemName, String itemDescription) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemDescription = itemDescription;
    }
}