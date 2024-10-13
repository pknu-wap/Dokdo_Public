package com.example.rememberdokdo.Repository.Inventory;

import com.example.rememberdokdo.Entity.Inventory.InventoryItemsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// 인벤토리 아이템
@Repository
public interface InventoryItemsRepository extends JpaRepository<InventoryItemsEntity, Integer> {
    // 인벤토리 식별자와 아이템 식별자 동시 조회
    Optional<InventoryItemsEntity> findByInventoryIdAndItemsId(Integer inventoryId, Integer itemId);


    // 인벤토리 식별자에 아이템 식별자가 존재하는지 여부를 확인하는 메서드
    boolean existsByInventoryIdAndItemsId(Integer inventoryId, Integer itemsId);
}

