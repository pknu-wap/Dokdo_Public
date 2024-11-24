package com.example.rememberdokdo.Dto;

import com.example.rememberdokdo.Entity.Stage4ItemEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Stage4ItemDto {

    private String itemName;        // 아이템 이름
    private String itemDescription; // 아이템 설명
    private boolean isCorrectItem;  // 정답 여부

    // Entity -> DTO 변환
    public static Stage4ItemDto fromEntity(Stage4ItemEntity entity) {
        return new Stage4ItemDto(
                entity.getItemName(),
                entity.getItemDescription(),
                entity.isCorrectItem() // 정답 여부
        );
    }

    // DTO -> Entity 변환
    public Stage4ItemEntity toEntity() {
        return Stage4ItemEntity.builder()
                .itemName(this.itemName)
                .itemDescription(this.itemDescription)
                .isCorrectItem(this.isCorrectItem)
                .build();
    }
}
