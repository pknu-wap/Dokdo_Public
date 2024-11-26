package com.example.rememberdokdo.Controller;

import com.example.rememberdokdo.Dto.*;
import com.example.rememberdokdo.Service.StageResetService;
import com.example.rememberdokdo.Service.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/stage")
public class StageController {

    @Autowired
    private StageService stageService;
    @Autowired
    private StageResetService stageResetService;

    // 특정 스테이지 접근 가능 여부 확인
    @GetMapping("/{stageId}/access")
    public StageDto checkAccess(@RequestParam String sessionId, @PathVariable("stageId") int stageId) {
        return stageService.checkStageAccess(sessionId, stageId);
    }

    // 스테이지 클리어 정보 저장
    @PostMapping("/{stageId}/clear")
    public SessionProgressDto clearStage(@RequestParam String sessionId, @PathVariable("stageId") int stageId) {
        if (stageId == 7) {
            // 스테이지 7 전용 메서드 호출
            return stageService.clearStageForStage7(sessionId);
        }
        return stageService.clearStage(sessionId, stageId);
    }

    // POST /stage/{stageId}/attempt
    @PostMapping("/{stageId}/attempt")
    public StageProgressResponseDto attemptMission(
            @PathVariable int stageId,
            @RequestParam String sessionId,
            @RequestParam String itemName // 아이템 이름 추가
    ) {
        // 스테이지 1, 2, 3은 미션 도전 불가
        if (stageId >= 1 && stageId <= 3) {
            throw new IllegalArgumentException("스테이지 " + stageId + "은 미션 도전이 불가능합니다. 1,2,3 스테이지를 클리어하고 오세요.");
        }
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

    // POST /stage/{stageId}/retry
    @PostMapping("/{stageId}/reset")
    public ResponseEntity<StageResetResponseDto> resetStage(
            @PathVariable int stageId,
            @RequestParam String sessionId) {
        return ResponseEntity.ok(stageResetService.resetStage(sessionId, stageId));
    }
}