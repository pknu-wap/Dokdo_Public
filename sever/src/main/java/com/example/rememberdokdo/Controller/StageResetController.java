package com.example.rememberdokdo.Controller;

import com.example.rememberdokdo.Dto.StageResetResponseDto;
import com.example.rememberdokdo.Service.StageResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stage")
public class StageResetController {
    @Autowired
    private StageResetService stageResetService;

    // DELETE /stage/reset
    @DeleteMapping("/reset")
    public ResponseEntity<StageResetResponseDto> resetStage(
            @RequestParam String sessionId) {
        return ResponseEntity.ok(stageResetService.resetStage(sessionId));
    }
}
