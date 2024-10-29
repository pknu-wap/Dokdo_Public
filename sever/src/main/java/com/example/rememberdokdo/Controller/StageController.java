package com.example.rememberdokdo.Controller;

import com.example.rememberdokdo.Dto.StageDto;
import com.example.rememberdokdo.Service.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public void clearStage(@RequestParam String sessionId, @PathVariable("stageId") int stageId) {
        stageService.clearStage(sessionId, stageId);
    }
}
