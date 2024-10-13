package com.example.rememberdokdo.Entity.Inventory;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // Lombok이 자동으로 getter, setter, equals, hashcode, toString 등을 생성
@NoArgsConstructor // 기본 생성자 생성
@AllArgsConstructor // 모든 필드를 인자로 받는 생성자 생성
@Builder // 빌더 패턴을 사용할 수 있도록 함
@Table(name = "Items")
public class ItemsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT 설정
    private Integer itemId; // 아이템 식별자
    private String itemName; // 아이템 이름
    private String itemDescription; // 아이템 설명
}
