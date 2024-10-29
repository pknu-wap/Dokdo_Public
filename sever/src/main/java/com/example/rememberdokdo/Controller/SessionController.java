package com.example.rememberdokdo.Controller;

import com.example.rememberdokdo.Dto.SessionDto;
import com.example.rememberdokdo.Dto.SessionProgressDto;
import com.example.rememberdokdo.Service.SessionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller  // HTML 템플릿을 반환할 수 있도록 Controller 사용
@RequestMapping("/session")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    // Mustache 템플릿을 반환하여 브라우저에서 직접 접근할 수 있도록 설정
    @GetMapping("/statusPage")
    public String showSessionStatusPage(Model model) {
        // 초기값을 설정하여 템플릿에 전달 (선택 사항)
        model.addAttribute("sessionId", "세션 ID가 없습니다");
        model.addAttribute("sessionStatus", "확인되지 않음");
        return "sessionStatus";  // sessionStatus.mustache 파일을 로드
    }

    // 세션 ID를 생성하고 JSON 형식으로 반환
    @PostMapping("/start")
    @ResponseBody
    public SessionDto startSession(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("application/json;charset=UTF-8");  // 응답 인코딩 설정
        SessionDto sessionDto = sessionService.startSession(request, response);
        return sessionDto;
    }

    // 세션이 유효한지 확인할 수 있는 엔드포인트
    @GetMapping("/validate")
    @ResponseBody  // JSON 응답
    public boolean validateSession(@RequestParam String sessionId) {
        return sessionService.validateSession(sessionId);
    }

    // 세션 상태 확인 및 진행 상황 반환 엔드포인트
    @GetMapping("/status")
    @ResponseBody  // JSON 응답
    public SessionProgressDto getSessionStatus(@RequestParam String sessionId) {
        return sessionService.getSessionStatus(sessionId);
    }
}

