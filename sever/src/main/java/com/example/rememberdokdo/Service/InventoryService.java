package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.Inventory.ItemAddRequestDto;
import com.example.rememberdokdo.Entity.Inventory.InventoryEntity;
import com.example.rememberdokdo.Entity.Inventory.ItemsEntity;
import com.example.rememberdokdo.Repository.Inventory.InventoryItemsRepository;
import com.example.rememberdokdo.Repository.Inventory.InventoryRepository;
import com.example.rememberdokdo.Repository.Inventory.ItemsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {
    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private ItemsRepository itemsRepository;
    @Autowired
    private InventoryItemsRepository inventoryItemsRepository;

    //아이템 추가
    @Transactional
    public void addItem(ItemAddRequestDto request) {
        // 세션 식별자 존재 확인
        InventoryEntity inventory = inventoryRepository.findBySessionId(request.getSessionId()).orElse(null);
        // 아이템 식별자 존재 확인
        ItemsEntity items = itemsRepository.findById(request.getItemId()).orElse(null);

        // 세션 식별자와 매핑된 인벤토리 식별자 존재 확인
        // 인벤토리 생성x => 인벤토리 생성
        // 인벤토리 생성o => 매핑된 인벤토리 식별자 조회

        // 인벤토리에 아이템 식별자 존재 확인
        // 아이템 식별자 존재o => 오류 메시지(중복일 경우)
        // 아이템 식별자 존재x => 아이템 추가

        // 조회한 인벤토리 위치에 아이템 추가

        // DB 테이블 최신화
    }
}
