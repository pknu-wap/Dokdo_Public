package com.example.rememberdokdo.Controller;

import com.example.rememberdokdo.Dto.SessionDto;
import com.example.rememberdokdo.Service.SessionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/session")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    // 사용자 웹페이지 접속 시 세션 ID를 생성하고 반환하며, 기존 게임 데이터를 초기화
    @PostMapping("/start")
    public SessionDto startSession(HttpServletRequest request, HttpServletResponse response) {
        // 세션을 시작하고 세션 ID를 클라이언트로 반환
        return sessionService.startSession(request, response);
    }

    // 세션 유효성 검증 API (세션 ID를 검증)
    @GetMapping("/validate")
    public boolean validateSession(@RequestHeader("Authorization") String sessionId) {
        return sessionService.validateSession(sessionId);
    }
}
