package com.example.rememberdokdo.Dto;

public class InventoryAddResponseDto {
    private Long sessionId; // 세션 식별자(넣을지 고민중)
    private String message; // 아이템 추가 성공 메시지
    private InventoryItemDto inventoryItem; // 추가된 아이템 정보
}
