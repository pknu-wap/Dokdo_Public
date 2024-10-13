package com.example.rememberdokdo.Dto.Inventory;

import lombok.Data;

@Data
public class ItemDeleteRequestDto {
    private String sessionId; // 세션 식별자
    private Integer itemId; // 아이템 식별자
}
