package com.example.rememberdokdo.Controller;

import com.example.rememberdokdo.Dto.*;
import com.example.rememberdokdo.Service.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/stage")
public class StageController {

    @Autowired
    private StageService stageService;

    // 특정 스테이지 접근 가능 여부 확인
    @GetMapping("/{stageId}/access")
    public StageDto checkAccess(@RequestParam String sessionId, @PathVariable("stageId") int stageId) {
        return stageService.checkStageAccess(sessionId, stageId);
    }

    // 스테이지 클리어 정보 저장
    @PostMapping("/{stageId}/clear")
    public SessionProgressDto clearStage(@RequestParam String sessionId, @PathVariable("stageId") int stageId) {
        return stageService.clearStage(sessionId, stageId);
    }

    // POST /stage/{stageId}/attempt
    @PostMapping("/{stageId}/attempt")
    public StageProgressResponseDto attemptMission(
            @PathVariable int stageId,
            @RequestParam String sessionId,
            @RequestParam String itemName // 아이템 이름 추가
    ) {
        return stageService.processItem(sessionId, stageId, itemName);
    }

    // GET /stage/{stageId}/status
    @GetMapping("/{stageId}/status")
    public StageProgressResponseDto getStageStatus(
            @PathVariable int stageId,
            @RequestParam String sessionId
    ) {
        return stageService.getStageStatus(sessionId, stageId);
    }
}