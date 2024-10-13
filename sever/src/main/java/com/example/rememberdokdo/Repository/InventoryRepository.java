package com.example.rememberdokdo.Repository;

import com.example.rememberdokdo.Entity.InventoryEntity;
import com.example.rememberdokdo.Entity.InventoryItemsEntity;
import com.example.rememberdokdo.Entity.ItemsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// 인벤토리
@Repository
public interface InventoryRepository extends JpaRepository<InventoryEntity, Integer> {
}