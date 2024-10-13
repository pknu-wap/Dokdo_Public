package com.example.rememberdokdo.Repository;

import com.example.rememberdokdo.Entity.InventoryItemsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// 인벤토리 아이템
@Repository
public interface InventoryItemsRepository extends JpaRepository<InventoryItemsEntity, Integer> {
}

