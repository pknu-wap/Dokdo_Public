package com.example.rememberdokdo.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionProgressDto {
    private String sessionId;
    private String userId;
    private List<StageStatus> stages;  // 진행 중인 스테이지 정보 목록
    private List<Item> inventory;      // 인벤토리에 있는 아이템 목록

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StageStatus {
        private int stageId;
        private boolean isCleared;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Item {
        private int itemId;
        private String itemName;
        private String itemDescription;
    }
}
