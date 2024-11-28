package com.example.rememberdokdo.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StageDto {
    private int stageId;
    private boolean isAccessible;  // 해당 스테이지 접근 가능 여부
    private boolean isCleared;     // 스테이지 클리어 여부
}
