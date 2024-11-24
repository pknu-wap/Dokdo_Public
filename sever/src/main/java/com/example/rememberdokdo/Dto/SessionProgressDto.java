package com.example.rememberdokdo.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionProgressDto {
    private String sessionId;
    private String userId;
    private List<StageStatus> stages;  // 진행 중인 스테이지 정보 목록
    private List<Item> inventory;      // 인벤토리에 있는 아이템 목록
    private LocalDateTime expiresAt; // 만료 시간 필드 추가
    private Boolean isActive;        // 활성화 여부 필드 추가

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StageStatus {
        private int stageId;
        private boolean isCleared;
        private Integer remainingHearts; // 남은 하트 수 (4, 5, 6 스테이지만 값 포함, 나머지는 null)
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