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

        // 아이템 식별자로 아이템 목록에 있는 아이템인지 확인
        ItemsEntity item = itemsRepository.findById(request.getItemId())
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 아이템이 존재하지 않습니다.: " + request.getItemId()));

        // 세션 식별자와 매핑된 인벤토리 조회
        // 인벤토리 생성x => 인벤토리 생성
        // 인벤토리 생성o => 매핑된 인벤토리 식별자 조회

        // 인벤토리에 아이템 식별자 존재 확인
        // 아이템 식별자 존재o => 오류 메시지(중복일 경우)
        // 아이템 식별자 존재x => 아이템 추가

        // 조회한 인벤토리 위치에 아이템 추가

        // DB 테이블 최신화
    }
}
