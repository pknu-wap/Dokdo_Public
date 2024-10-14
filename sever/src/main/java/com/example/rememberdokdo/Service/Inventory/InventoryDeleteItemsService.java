package com.example.rememberdokdo.Service.Inventory;

import com.example.rememberdokdo.Dto.Inventory.ItemDeleteRequestDto;
import com.example.rememberdokdo.Entity.Inventory.InventoryEntity;
import com.example.rememberdokdo.Entity.Inventory.InventoryItemsEntity;
import com.example.rememberdokdo.Entity.Inventory.ItemsEntity;
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

        // 요청에서 받은 아이템 식별자로 아이템 목록에 있는 아이템인지 확인
        ItemsEntity item = itemsRepository.findById(request.getItemId())
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 아이템이 존재하지 않습니다.: " + request.getItemId()));
        // 조회된 아이템 식별자 가져오기
        Integer itemId = item.getItemId();
        System.out.println("아이템 식별자 : " + itemId);
        // 아이템 식별자에 대한 아이템 이름, 아이템 설명 정보 조회
        String itemName = item.getItemName(); // 아이템 이름
        String itemDescription = item.getItemDescription(); // 아이템 설명

        // 세션 식별자에 매핑된 인벤토리에서 해당 아이템이 존재하는지 확인
        boolean itemAlreadyInInventory = inventoryItemsRepository.existsByInventoryIdAndItemId(inventoryId, itemId);
        if (!itemAlreadyInInventory) {
            // 아이템이 이미 인벤토리에 존재하지 않는다면 오류 메시지 반환
            throw new IllegalArgumentException("해당 아이템이 인벤토리에 존재하지 않습니다.");
        }

        // 아이템 삭제
        InventoryItemsEntity inventoryItem = inventoryItemsRepository.findByInventoryIdAndItemId(inventoryId, itemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 아이템을 인벤토리에서 찾을 수 없습니다."));

        // 인벤토리에서 아이템 삭제
        inventoryItemsRepository.delete(inventoryItem);
    }
}