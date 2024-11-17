package com.example.rememberdokdo.Controller;

import com.example.rememberdokdo.Dto.Stage4ProgressDto;
import com.example.rememberdokdo.Service.Stage4ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stage/4")
public class Stage4ProgressController {

    @Autowired
    private Stage4ProgressService stage4ProgressService;

    @PostMapping("/mission/retry/{sessionId}/{currentMissionId}/{isCurrentMissionCleared}")
    public ResponseEntity<Stage4ProgressDto> retryMission(
            @PathVariable String sessionId,
            @PathVariable int currentMissionId,
            @PathVariable boolean isCurrentMissionCleared) {
        return ResponseEntity.ok(stage4ProgressService.retryMission(sessionId, currentMissionId, isCurrentMissionCleared));
    }
}
