package com.example.rememberdokdo.Service.Inventory;

import com.example.rememberdokdo.Dto.Inventory.ItemDeleteRequestDto;
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

    }
}
