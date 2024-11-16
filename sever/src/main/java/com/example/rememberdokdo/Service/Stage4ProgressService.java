package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.Stage4ProgressDto;
import com.example.rememberdokdo.Repository.Stage4ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Stage4ProgressService {
    @Autowired
    private Stage4ProgressRepository stage4ProgressRepository;

    // 초기화(시작) 기능
    public Stage4ProgressDto startMission(Stage4ProgressDto stage4ProgressDto) {
        // sessionId 유효성 검사 => 아마도 필요없음
        // Stage3 클리어 여부 확인
        // Stage4 초기화 진행
        // DB에 새로운 Progress 정보 저장
        // 응답 Dto 반환
    }

    // 미션 도전 기능
    public Stage4ProgressDto attemptMission(Stage4ProgressDto stage4ProgressDto) {
        // 현재 미션 번호 유효성 검사 => 1,2,3만 가능
        // 미션 성공/실패 여부에 따른 처리
        // 성공 -> 미션 번호 증가 : 다음 미션으로 이동
        //=> 미션 번호가 3일때, 성공하면 그대로 3으로 유지하고, 증가x(퍼즐 게임하게됨)
        // 실패 -> 하트 개수 감소
        // 게임 오버 확인(하트 개수 = 0)
        // DB에 변경된 Progress 정보 저장
        // 응답 Dto 반환
    }
}
