package com.example.rememberdokdo.Service.Inventory;

import com.example.rememberdokdo.Dto.Inventory.ItemAddRequestDto;
import com.example.rememberdokdo.Dto.Inventory.ItemAddResponseDto;
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
public class InventoryAddItemsService {
    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private ItemsRepository itemsRepository;
    @Autowired
    private InventoryItemsRepository inventoryItemsRepository;

    //아이템 추가
    @Transactional
    public void addItem(ItemAddRequestDto request) {
        // 세션 만료 여부 확인
//        boolean sessionExpired = checkSessionExpired(request.getSessionId());
//        if (sessionExpired) {
//            throw new IllegalArgumentException("세션이 만료되었거나 유효하지 않습니다.");
//        }

        // 세션 식별자로 인벤토리 조회
        InventoryEntity inventory = inventoryRepository.findBySessionId(request.getSessionId())
                .orElseGet(() -> {
                    // 인벤토리 없으면 새로 생성
                    InventoryEntity newInventory = new InventoryEntity();
                    newInventory.setSessionId(request.getSessionId()); // 클라이언트로부터 받은 세션 식별자에 매핑된 인벤토리 생성
                    return inventoryRepository.save(newInventory); // 새 인벤토리 저장 및 반환
                });

        // 조회된 인벤토리 식별자 가져오기
        Integer inventoryId = inventory.getInventoryId();

        // 요청에서 받은 아이템 식별자로 아이템 목록에 있는 아이템인지 확인
        ItemsEntity item = itemsRepository.findById(request.getItemId())
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 아이템이 존재하지 않습니다.: " + request.getItemId()));

        // 세션 식별자에 매핑된 인벤토리에서 해당 아이템이 이미 존재하는지 확인(중복 확인)
        if(inventoryItemsRepository.existsByInventoryIdAndItemId(inventoryId, item.getItemId())){
            // 아이템이 이미 인벤토리에 존재하면 오류 메시지 반환
            throw new IllegalArgumentException("해당 아이템이 이미 인벤토리에 존재합니다.");
        }

        // 아이템이 존재하지 않으면 인벤토리에 아이템 추가
        InventoryItemsEntity inventoryItem = new InventoryItemsEntity();
        inventoryItem.setInventoryId(inventoryId);// 인벤토리 식별자
        inventoryItem.setItemId(item.getItemId()); // 아이템 식별자
        inventoryItem.setItemName(item.getItemName()); // 아이템 이름
        inventoryItem.setItemDescription(item.getItemDescription()); // 아이템 설명

        // 인벤토리에 아이템을 매핑해 저장 (DB 테이블 최신화)
        inventoryItemsRepository.save(inventoryItem);
    }
}
