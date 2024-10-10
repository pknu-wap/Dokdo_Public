package com.example.rememberdokdo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "Session")
@Data  // Lombok이 자동으로 getter, setter, equals, hashcode, toString 등을 생성
@NoArgsConstructor  // 기본 생성자 생성
@AllArgsConstructor  // 모든 필드를 사용하는 생성자 생성
@Builder  // 빌더 패턴을 사용할 수 있도록 함

public class SessionEntity {

    @Id
    @Column(name = "id", nullable = false, length = 255)
    private String id;  // 세션 ID

    @Column(name = "user_id", nullable = false, length = 255)
    private String userId;  // 사용자 ID

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;  // 세션 생성 시간

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;  // 세션 만료 시간

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;  // 세션 활성화 여부
}
