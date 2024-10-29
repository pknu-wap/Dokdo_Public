package com.example.rememberdokdo.Controller;

import com.example.rememberdokdo.Dto.Inventory.ItemAddRequestDto;
import com.example.rememberdokdo.Dto.Inventory.ItemAddResponseDto;
import com.example.rememberdokdo.Dto.Inventory.ItemDeleteRequestDto;
import com.example.rememberdokdo.Dto.Inventory.ItemDeleteResponseDto;
import com.example.rememberdokdo.Entity.Inventory.InventoryEntity;
import com.example.rememberdokdo.Entity.Inventory.InventoryItemsEntity;
import com.example.rememberdokdo.Repository.Inventory.InventoryItemsRepository;
import com.example.rememberdokdo.Repository.Inventory.InventoryRepository;
import com.example.rememberdokdo.Service.Inventory.InventoryAddItemsService;
import com.example.rememberdokdo.Service.Inventory.InventoryDeleteItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    private InventoryAddItemsService inventoryAddItemsService;
    @Autowired
    private InventoryDeleteItemsService inventoryDeleteItemsService;

    @Autowired
    private InventoryItemsRepository inventoryItemsRepository;
    @Autowired
    private InventoryRepository inventoryRepository;

    // 아이템 추가 및 삭제 입력 폼
    @GetMapping("/form")
    public String showForm() {
        return "inventoryForm";
    }

    @PostMapping("/add")
    public String addItem (@RequestParam("sessionId") String sessionId,
                          @RequestParam("itemId") Integer itemId,
                          Model model) {
        ItemAddRequestDto addRequest = new ItemAddRequestDto(sessionId, itemId);
        inventoryAddItemsService.addItem(addRequest);
        return "redirect:/inventory/items?sessionId=" + sessionId;  // 전체 아이템 조회로 리다이렉트
    }

    @PostMapping("/delete")
    public String deleteItem(@RequestParam("sessionId") String sessionId,
                             @RequestParam("itemId") Integer itemId,
                             Model model) {
        ItemDeleteRequestDto deleteRequest = new ItemDeleteRequestDto(sessionId, itemId);
        inventoryDeleteItemsService.deleteItem(deleteRequest);
        return "redirect:/inventory/items?sessionId=" + sessionId; // 전체 아이템 조회로 리다이렉트
    }

    // 인벤토리 ID별 아이템 목록
    @GetMapping("/items")
    public String showAllItems(@RequestParam("sessionId") String sessionId, Model model) {
        InventoryEntity inventory = inventoryRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 세션에 대한 인벤토리가 존재하지 않습니다."));

        // 인벤토리 ID와 세션 ID를 모델에 추가
        model.addAttribute("sessionId", sessionId);
        model.addAttribute("inventoryId", inventory.getInventoryId());

        List<InventoryItemsEntity> items = inventoryItemsRepository.findByInventoryId(inventory.getInventoryId());
        model.addAttribute("items", items);
        return "inventoryItems";
    }
}