package com.example.rememberdokdo.Repository.Inventory;

import com.example.rememberdokdo.Entity.Inventory.ItemsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// 아이템
@Repository
public interface ItemsRepository extends JpaRepository<ItemsEntity, Integer> {
}
