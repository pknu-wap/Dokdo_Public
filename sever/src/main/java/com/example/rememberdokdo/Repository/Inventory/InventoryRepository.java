package com.example.rememberdokdo.Repository.Inventory;

import com.example.rememberdokdo.Entity.Inventory.InventoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// 인벤토리
@Repository
public interface InventoryRepository extends JpaRepository<InventoryEntity, Integer> {
    // 세션 식별자와 매핑된 인벤토리 식별자 존재 여부 확인
    Optional<InventoryEntity> findBySessionId(String sessionId);
}