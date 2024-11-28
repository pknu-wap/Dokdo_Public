package com.example.rememberdokdo.Controller;

import com.example.rememberdokdo.Dto.Inventory.ItemAddRequestDto;
import com.example.rememberdokdo.Dto.Inventory.ItemAddResponseDto;
import com.example.rememberdokdo.Dto.Inventory.ItemDeleteRequestDto;
import com.example.rememberdokdo.Dto.Inventory.ItemDeleteResponseDto;
import com.example.rememberdokdo.Service.Inventory.InventoryAddItemsService;
import com.example.rememberdokdo.Service.Inventory.InventoryDeleteItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    private InventoryAddItemsService inventoryAddItemsService;
    @Autowired
    private InventoryDeleteItemsService inventoryDeleteItemsService;

    @PostMapping(value = "/add")
    public ItemAddResponseDto addItem(@RequestBody ItemAddRequestDto requestDto) {
        return inventoryAddItemsService.addItem(requestDto);
    }

    @DeleteMapping(value = "/delete")
    public ItemDeleteResponseDto deleteItem(@RequestBody ItemDeleteRequestDto requestDto) {
        return inventoryDeleteItemsService.deleteItem(requestDto);
    }
}