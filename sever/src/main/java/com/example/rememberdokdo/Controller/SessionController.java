package com.example.rememberdokdo.Controller;

import com.example.rememberdokdo.Dto.SessionDto;
import com.example.rememberdokdo.Dto.SessionProgressDto;
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

    // 사용자 웹페이지 접속 시 세션 ID를 생성하고 쿠키에 저장하며, 기존 게임 데이터를 초기화
    @PostMapping("/start")
    public SessionDto startSession(HttpServletRequest request, HttpServletResponse response) {
        // 세션을 시작하고, 쿠키에 저장하며, 게임 데이터를 초기화 (기능 추가 나중에 해줄 것 !)
        return sessionService.startSession(request, response);
    }

    //세션이 유효한지 확인할 수 있는 엔드포인트
    @GetMapping("/validate")
    public boolean validateSession(@RequestParam String sessionId) {
        return sessionService.validateSession(sessionId);
    }

    // 세션 상태 확인 및 진행 상황 반환 엔드포인트
    @GetMapping("/status")
    public SessionProgressDto getSessionStatus(@RequestParam("sessionId") String sessionId) {
        if (sessionId == null) {
            // sessionId가 없을 때의 처리
            throw new IllegalArgumentException("Session ID가 유효하지 않습니다");
        }
        return sessionService.getSessionStatus(sessionId);
    }

}
