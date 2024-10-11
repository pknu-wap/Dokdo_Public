package com.example.rememberdokdo.Dto;

import com.example.rememberdokdo.Entity.SessionEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class SessionDto {

    private String sessionId;  // 세션 ID
    private String userId;  // 사용자 ID
    private LocalDateTime createdAt;  // 세션 생성 시간
    private LocalDateTime expiresAt;  // 세션 만료 시간
    private Boolean isActive;  // 세션 활성화 여부

    // Entity -> DTO 변환
    public static SessionDto fromEntity(SessionEntity sessionEntity) {
        return new SessionDto(
                sessionEntity.getId(),
                sessionEntity.getUserId(),
                sessionEntity.getCreatedAt(),
                sessionEntity.getExpiresAt(),
                sessionEntity.getIsActive()
        );
    }

    // DTO -> Entity 변환
    public SessionEntity toEntity() {
        return SessionEntity.builder()
                .id(this.sessionId)
                .userId(this.userId)
                .createdAt(this.createdAt)
                .expiresAt(this.expiresAt)
                .isActive(this.isActive)
                .build();
    }
}
