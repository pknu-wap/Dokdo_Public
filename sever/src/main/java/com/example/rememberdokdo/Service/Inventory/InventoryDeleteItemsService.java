package com.example.rememberdokdo.Service.Inventory;

import com.example.rememberdokdo.Dto.Inventory.ItemDeleteRequestDto;
import com.example.rememberdokdo.Entity.Inventory.InventoryEntity;
import com.example.rememberdokdo.Repository.Inventory.InventoryItemsRepository;
import com.example.rememberdokdo.Repository.Inventory.InventoryRepository;
import com.example.rememberdokdo.Repository.Inventory.ItemsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryDeleteItemsService {
    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private ItemsRepository itemsRepository;
    @Autowired
    private InventoryItemsRepository inventoryItemsRepository;

    @Transactional
    public void deleteItem(ItemDeleteRequestDto request) {
        // 세션 만료 여부 확인
//        boolean sessionExpired = checkSessionExpired(request.getSessionId());
//        if (sessionExpired) {
//            throw new IllegalArgumentException("세션이 만료되었거나 유효하지 않습니다.");
//        }

        // 세션 식별자로 인벤토리 조회
        InventoryEntity inventory = inventoryRepository.findBySessionId(request.getSessionId())
                .orElseThrow(() -> new IllegalArgumentException("해당 세션에 대한 인벤토리가 존재하지 않습니다."));

        // 조회된 인벤토리 식별자 가져오기
        Integer inventoryId = inventory.getInventoryId();
        System.out.println("인벤토리 식별자 : " + inventoryId);
    }
}