package com.example.rememberdokdo.Dto.Inventory;

import lombok.Data;

@Data
public class ItemAddRequestDto {
    private String sessionId; // 세션 식별자(넣을지 고민중)
    private Integer itemId; // 아이템 식별자
}