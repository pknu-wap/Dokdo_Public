package com.example.rememberdokdo.Service.Inventory;

import com.example.rememberdokdo.Dto.Inventory.ItemDeleteRequestDto;
import com.example.rememberdokdo.Dto.Inventory.ItemDeleteResponseDto;
import com.example.rememberdokdo.Entity.Inventory.InventoryEntity;
import com.example.rememberdokdo.Entity.Inventory.InventoryItemsEntity;
import com.example.rememberdokdo.Entity.Inventory.ItemsEntity;
import com.example.rememberdokdo.Entity.SessionEntity;
import com.example.rememberdokdo.Repository.Inventory.InventoryItemsRepository;
import com.example.rememberdokdo.Repository.Inventory.InventoryRepository;
import com.example.rememberdokdo.Repository.Inventory.ItemsRepository;
import com.example.rememberdokdo.Repository.SessionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class InventoryDeleteItemsService {
    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private ItemsRepository itemsRepository;
    @Autowired
    private InventoryItemsRepository inventoryItemsRepository;
    @Autowired
    private SessionRepository sessionRepository;

    @Transactional
    public ItemDeleteResponseDto deleteItem(ItemDeleteRequestDto request) {
        // 세션 만료 여부 확인
        Optional<SessionEntity> session = sessionRepository.findBySessionIdAndExpiresAtAfter(request.getSessionId(), LocalDateTime.now());
        if (session.isEmpty()) {
            throw new IllegalArgumentException("세션이 만료되었거나 유효하지 않습니다.");
        }

        // 세션 식별자로 인벤토리 조회
        InventoryEntity inventory = inventoryRepository.findBySessionId(request.getSessionId())
                .orElseThrow(() -> new IllegalArgumentException("해당 세션에 대한 인벤토리가 존재하지 않습니다."));

        // 조회된 인벤토리 식별자 가져오기
        Integer inventoryId = inventory.getInventoryId();
        System.out.println("인벤토리 식별자 : " + inventoryId);

        // 요청에서 받은 아이템 식별자로 아이템 목록에 있는 아이템인지 확인
        ItemsEntity item = itemsRepository.findById(request.getItemId())
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 아이템이 존재하지 않습니다.: " + request.getItemId()));

        // 세션 식별자에 매핑된 인벤토리에서 해당 아이템이 존재하는지 확인
        if(!inventoryItemsRepository.existsByInventoryIdAndItemId(inventoryId, item.getItemId())){
            // 아이템이 이미 인벤토리에 존재하지 않는다면 오류 메시지 반환
            throw new IllegalArgumentException("해당 아이템이 인벤토리에 존재하지 않습니다.");
        }

        // 아이템 삭제
        InventoryItemsEntity inventoryItem = inventoryItemsRepository.findByInventoryIdAndItemId(inventoryId, item.getItemId())
                .orElseThrow(() -> new IllegalArgumentException("해당 아이템을 인벤토리에서 찾을 수 없습니다."));

        // 인벤토리에서 아이템 삭제
        inventoryItemsRepository.delete(inventoryItem);

        // 응답 DTO 생성 및 반환
        return new ItemDeleteResponseDto(item.getItemId(), item.getItemName(), item.getItemDescription());
    }
}