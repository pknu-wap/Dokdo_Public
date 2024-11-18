package com.example.rememberdokdo.Controller;

import com.example.rememberdokdo.Dto.Stage4ProgressDto;
import com.example.rememberdokdo.Service.Stage4ProgressServiceC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stage/4")
public class Stage4ControllerC {

    @Autowired
    private Stage4ProgressServiceC stage4ProgressServiceC;

    @PostMapping("/mission/start/{sessionId}")
    public ResponseEntity<Stage4ProgressDto> startStage4(@PathVariable String sessionId) {
        return ResponseEntity.ok(stage4ProgressServiceC.startStage4(sessionId));
    }

    @PostMapping("/mission/attempt/{sessionId}/{currentMissionId}")
    public ResponseEntity<Stage4ProgressDto> attemptMission(
            @PathVariable String sessionId,
            @PathVariable int currentMissionId,
            @RequestParam String selectedItemName) { // 사용자가 선택한 아이템 이름
        return ResponseEntity.ok(stage4ProgressServiceC.attemptMission(sessionId, currentMissionId, selectedItemName));
    }
    @GetMapping("/status/{sessionId}")
    public ResponseEntity<Stage4ProgressDto> getStatus(@PathVariable String sessionId) {
        return ResponseEntity.ok(stage4ProgressServiceC.getStatus(sessionId));
    }
}
