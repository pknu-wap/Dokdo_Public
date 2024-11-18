package com.example.rememberdokdo.Repository.Inventory;

import com.example.rememberdokdo.Entity.Inventory.InventoryItemsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// 인벤토리 아이템
@Repository
public interface InventoryItemsRepository extends JpaRepository<InventoryItemsEntity, Integer> {
    // 인벤토리 식별자와 아이템 식별자 동시 조회
    Optional<InventoryItemsEntity> findByInventoryIdAndItemId(Integer inventoryId, Integer itemId);


    // 인벤토리 식별자에 아이템 식별자가 존재하는지 여부를 확인하는 메서드
    boolean existsByInventoryIdAndItemId(Integer inventoryId, Integer itemId);

    // 인벤토리 ID로 인벤토리 아이템 목록 조회
    List<InventoryItemsEntity> findByInventoryId(Integer inventoryId);

    // sessionId가 같은 모든 레코드 삭제하는 메서드
    @Modifying
    @Query("DELETE FROM Stage4ProgressEntity p WHERE p.sessionId = :sessionId")
    void deleteAllBySessionId(@Param("sessionId") String sessionId);
}

