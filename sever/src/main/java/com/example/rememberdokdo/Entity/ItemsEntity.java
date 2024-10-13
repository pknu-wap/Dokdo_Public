package com.example.rememberdokdo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Items")
@Getter
@Setter
public class ItemsEntity {
    @Id
    private Integer itemId; // 아이템 식별자
    private String itemName; // 아이템 이름
    private String itemDescription; // 아이템 설명
}
