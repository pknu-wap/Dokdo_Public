package com.example.rememberdokdo.Controller;

import com.example.rememberdokdo.Dto.SessionDto;
import com.example.rememberdokdo.Dto.SessionProgressDto;
import com.example.rememberdokdo.Service.SessionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/session")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    // 루트 경로를 /session/statusPage로 리다이렉트하는 메서드 추가
    @GetMapping("/")
    public String redirectToStatusPage() {
        return "redirect:/session/statusPage";
    }

    @GetMapping("/statusPage")
    public String showSessionStatusPage(Model model) {
        model.addAttribute("sessionId", "세션 ID가 없습니다");     // 기본값 설정
        model.addAttribute("sessionStatus", "확인되지 않음");    // 기본값 설정
        model.addAttribute("userId", "사용자 ID 없음");          // userId 추가
        return "sessionStatus";
    }

    // 세션 시작 엔드포인트
    @PostMapping("/start")
    @ResponseBody
    public SessionDto startSession(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("application/json;charset=UTF-8");
        return sessionService.startSession(request, response);
    }

    // 세션 유효성 확인 엔드포인트
    @GetMapping("/validate")
    @ResponseBody
    public boolean validateSession(@RequestParam String sessionId) {
        return sessionService.validateSession(sessionId);
    }

    // 세션 상태 확인 및 진행 상황 반환 엔드포인트
    @GetMapping("/status")
    @ResponseBody
    public SessionProgressDto getSessionStatus(@RequestParam String sessionId) {
        return sessionService.getSessionStatus(sessionId);
    }

    // 스테이지 완료 처리 엔드포인트
    @PostMapping("/completeStage")
    public ResponseEntity<String> completeStage(@RequestBody Map<String, Object> payload) {
        String sessionId = (String) payload.get("sessionId");
        int stageId = (Integer) payload.get("stageId");
        try {
            sessionService.completeStage(sessionId, stageId);
            return ResponseEntity.ok("Stage " + stageId + " completed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error completing stage: " + e.getMessage());
        }
    }
}
