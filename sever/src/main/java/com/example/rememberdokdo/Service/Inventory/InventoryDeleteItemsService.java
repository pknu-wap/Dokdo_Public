package com.example.rememberdokdo.Service.Inventory;

import com.example.rememberdokdo.Dto.Inventory.ItemDeleteRequestDto;
import com.example.rememberdokdo.Repository.Inventory.InventoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryDeleteItemsService {
    @Autowired
    private InventoryRepository inventoryRepository;

    @Transactional
    public void deleteItem(ItemDeleteRequestDto request) {

    }
}
