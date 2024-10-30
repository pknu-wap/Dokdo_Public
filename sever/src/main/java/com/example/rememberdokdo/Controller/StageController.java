package com.example.rememberdokdo.Controller;

import com.example.rememberdokdo.Dto.StageDto;
import com.example.rememberdokdo.Service.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/stage")
public class StageController {

    @Autowired
    private StageService stageService;

    // 특정 스테이지 접근 가능 여부 확인 및 정보 전달 (Mustache 템플릿 렌더링)
    @GetMapping("/{stageId}/accessPage")
    public ModelAndView checkAccessPage(@RequestParam String sessionId, @PathVariable("stageId") int stageId) {
        StageDto stageDto = stageService.checkStageAccess(sessionId, stageId);
        ModelAndView modelAndView = new ModelAndView("sessionStatus"); // sessionStatus.mustache와 매핑
        modelAndView.addObject("stageId", stageDto.getStageId());
        modelAndView.addObject("isAccessible", stageDto.isAccessible());
        modelAndView.addObject("isCleared", stageDto.isCleared());
        modelAndView.addObject("sessionId", sessionId);  // 클리어 요청에 필요한 sessionId 추가
        return modelAndView;
    }

    // 특정 스테이지 접근 가능 여부 확인 (JSON 응답)
    @GetMapping("/{stageId}/access")
    @ResponseBody
    public StageDto checkAccess(@RequestParam String sessionId, @PathVariable("stageId") int stageId) {
        return stageService.checkStageAccess(sessionId, stageId); // JSON으로 StageDto 반환
    }

    // 스테이지 클리어 정보 저장
    @PostMapping("/{stageId}/clear")
    public String clearStage(@RequestParam String sessionId, @PathVariable("stageId") int stageId) {
        stageService.clearStage(sessionId, stageId);
        return "redirect:/stage/" + stageId + "/accessPage?sessionId=" + sessionId;
    }
}

