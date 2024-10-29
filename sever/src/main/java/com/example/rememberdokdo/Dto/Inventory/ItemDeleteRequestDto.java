package com.example.rememberdokdo.Dto.Inventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드를 포함하는 생성자
public class ItemDeleteRequestDto {
    private String sessionId; // 세션 식별자
    private Integer itemId; // 아이템 식별자
}
