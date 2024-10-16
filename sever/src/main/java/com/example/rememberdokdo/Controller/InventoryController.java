package com.example.rememberdokdo.Controller;

import com.example.rememberdokdo.Dto.Inventory.ItemAddRequestDto;
import com.example.rememberdokdo.Dto.Inventory.ItemAddResponseDto;
import com.example.rememberdokdo.Entity.Inventory.ItemsEntity;
import com.example.rememberdokdo.Repository.Inventory.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    private ItemsRepository itemsRepository;

    @PostMapping(value = "/add")
    public ItemAddResponseDto addInventory(ItemAddRequestDto requestDto) {
        ItemAddResponseDto itemAddResponse = new ItemAddResponseDto();
        ItemsEntity item = itemsRepository.findById(requestDto.getItemId())
            .orElseThrow(() -> // 존재하지 않는다면 Exception이 발생
                    new IllegalArgumentException("\"해당 ID의 아이템이 존재하지 않습니다.: \" + request.getItemId())"));


        Integer itemId = item.getItemId();
        String itemName = item.getItemName();
        String itemDescription = item.getItemDescription();

        itemAddResponse.setItemId(itemId);
        itemAddResponse.setItemName(itemName);
        itemAddResponse.setItemDescription(itemDescription);

        return new ItemAddResponseDto();
    }
}
