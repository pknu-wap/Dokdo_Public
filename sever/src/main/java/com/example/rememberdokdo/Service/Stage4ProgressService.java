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
        return null;
    }

    // 미션 도전 기능
    public Stage4ProgressDto attemptMission(Stage4ProgressDto stage4ProgressDto) {
        // 세션 ID 유효성 검사
        // 현재 미션 ID 3인지 검사 => 3이면 진행 불가능
        // 미션 성공/실패 여부에 따른 처리(현재 미션 ID < 3)
        // 성공 -> 미션 번호 증가 : 다음 미션으로 이동
        //=> 미션 번호가 3일때, 성공하면 그대로 3으로 유지하고, 증가x(퍼즐 게임하게됨)
        // 실패 -> 하트 개수 감소
        // 하트 개수 = 0 이라면, 게임 오버 상태로 변경
        // DB에 변경된 Progress 정보 저장
        // 응답 Dto 반환
        return null;
    }

    // 상태 조회 기능
    public Stage4ProgressDto getStatus(Stage4ProgressDto stage4ProgressDto) {
        // 세션 ID 유효성 검사
        // 세션 ID에 대한 Stage4Progress 조회
        // Entity에서 Dto로 변환
        return null;
    }

    // 미션 재도전 기능
    public Stage4ProgressDto retryMission(Stage4ProgressDto stage4ProgressDto) {
        // 세션 ID 유효성 검사
        if (stage4ProgressDto.getSessionId() == null){
            throw new IllegalArgumentException("세션이 만료되었거나 유효하지 않습니다.");
        }
        // 현재 미션 ID 3인지 검사 => 3이면 진행 불가능
        // 실패한 미션 재도전할 수 있는지 확인(하트 개수 > 0)
        // 재도전 할때마다 하트 감소
        // 재도전 성공 시, 미션 번호 증가(3이상 불가능)
        // 남은 하트 수가 0이 되면 게임오버 상태로 변경
        // DB에 변경된 Progress 정보 저장
        // 응답 Dto 반환
        return null;
    }

    // 초기화(게임 오버) 기능
    public Stage4ProgressDto resetGame(Stage4ProgressDto stage4ProgressDto) {
        // 기존 데이터 삭제?
        // 기존 스테이지 4상태 초기화
        // DB에 새로운 Progress 정보 저장
        // 응답 Dto 반환
        return null;
    }
}
