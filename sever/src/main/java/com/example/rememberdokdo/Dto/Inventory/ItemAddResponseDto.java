package com.example.rememberdokdo.Dto.Inventory;

import lombok.Data;

@Data
public class ItemAddResponseDto {
    private Integer ItemId; // 아이템 식별자
    private String ItemName; // 아이템 이름
    private String ItemDescription; // 아이템 설명
}
