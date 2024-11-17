package com.example.rememberdokdo.Service;

import com.example.rememberdokdo.Dto.Stage4ProgressDto;
import com.example.rememberdokdo.Entity.Stage4ProgressEntity;
import com.example.rememberdokdo.Repository.Stage4ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Stage4ProgressService {
    @Autowired
    private Stage4ProgressRepository stage4ProgressRepository;
    private Stage4ProgressEntity stage4ProgressEntity;

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
    public Stage4ProgressDto retryMission(String sessionId, int currentMissionId, boolean isCurrentMissionCleared) {
        // 세션 ID 유효성 검사
        if (sessionId == null || sessionId.isEmpty()){
            throw new IllegalArgumentException("세션이 만료되었거나 유효하지 않습니다.");
        }

        // DB에서 세션 ID로 진행 상황 조회
        Stage4ProgressEntity stage4ProgressEntity = stage4ProgressRepository
                .findBySessionId(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("세션 ID에 대한 스테이지4 진행 정보가 없습니다."));

        // 현재 미션 ID 검사 => 3이면 진행 불가능
        if (stage4ProgressEntity.getCurrentMissionId() == 3) {
            throw new IllegalArgumentException("현재 미션이 3단계이므로, 미션 진행이 불가능합니다.");
        }

        // 하트 개수 확인 => 실패한 미션 재도전 가능 여부(하트 개수 > 0)
        if (stage4ProgressEntity.getRemainingHearts() <= 0){ // 미션 재도전 불가능
            stage4ProgressEntity.setGameOver(true); // 게임 오버 상태로 변경(하트가 없으므로)
            stage4ProgressRepository.save(stage4ProgressEntity); // 변경된 상태 저장
            throw new IllegalArgumentException("남은 하트가 없으므로 게임 오버되었습니다.");
        }

        // 처음 시도한 미션이 실패했는지 확인
        if (!stage4ProgressEntity.isCurrentMissionCleared()){
            // 재도전한 현재 미션 실패한 경우
            if (!isCurrentMissionCleared){
                stage4ProgressEntity.setRemainingHearts(stage4ProgressEntity.getRemainingHearts() - 1); // 실패한 미션에 대해 하트 차감

                // 하트가 0인 경우
                if (stage4ProgressEntity.getRemainingHearts() == 0){
                    stage4ProgressEntity.setGameOver(true); // 게임 오버 상태로 변경
                }
            } else {
                // 재도전한 현재 미션 성공한 경우
                if (stage4ProgressEntity.getCurrentMissionId() < 3){ // 미션 1, 2
                    stage4ProgressEntity.setCurrentMissionId(stage4ProgressEntity.getCurrentMissionId() + 1); // 성공한 미션에 대해 다음 미션으로 이동
                    stage4ProgressEntity.setCurrentMissionCleared(true); // 미션 클리어 true로 변환
                } else { // 미션 3
                    stage4ProgressEntity.setCurrentMissionCleared(true); // 미션 클리어 true로 변환
                }
            }
        } else { // 처음 시도한 미션이 성공한 미션인 경우 => 미션 재도전 불가능
            throw new IllegalArgumentException("현재 미션을 이미 클리어하여 재도전이 불가능합니다.");
        }

        // DB에 변경된 Progress 정보 저장
        stage4ProgressRepository.save(stage4ProgressEntity);

        // 응답 Dto 반환
        Stage4ProgressDto stage4ProgressResponseDto = new Stage4ProgressDto();
        stage4ProgressResponseDto.setProgressId(stage4ProgressEntity.getProgressId());
        stage4ProgressResponseDto.setSessionId(stage4ProgressEntity.getSessionId());
        stage4ProgressResponseDto.setCurrentMissionId(stage4ProgressEntity.getCurrentMissionId());
        stage4ProgressResponseDto.setRemainingHearts(stage4ProgressEntity.getRemainingHearts());
        stage4ProgressResponseDto.setCurrentMissionCleared(stage4ProgressEntity.isCurrentMissionCleared());
        stage4ProgressResponseDto.setGameOver(stage4ProgressEntity.isGameOver());

        return stage4ProgressResponseDto;
    }

    // 초기화(게임 오버) 기능
    public Stage4ProgressDto resetGame(String sessionId) {
        // 세션 ID 유효성 검사
        if (sessionId == null || sessionId.isEmpty()){
            throw new IllegalArgumentException("세션이 만료되었거나 유효하지 않습니다.");
        }

        // DB에서 세션 ID로 진행 상황 조회
        Stage4ProgressEntity stage4ProgressEntity = stage4ProgressRepository
                .findBySessionId(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("세션 ID에 대한 스테이지4 진행 정보가 없습니다."));

        // 기존 데이터 삭제(진행 상태 삭제)
        stage4ProgressRepository.delete(stage4ProgressEntity);

        // 기존 스테이지 4 상태 초기화
        stage4ProgressEntity.setCurrentMissionId(1); // 첫 번째 미션부터 시작
        stage4ProgressEntity.setRemainingHearts(3); // 초기 하트 개수 = 3
        stage4ProgressEntity.setCurrentMissionCleared(false); // 현재 미션 클리어 여부
        stage4ProgressEntity.setGameOver(false); // 게임 오버 상태 초기화

        // DB에 새로운 Progress 정보 저장
        stage4ProgressRepository.save(stage4ProgressEntity);

        // 응답 Dto 반환
        Stage4ProgressDto stage4ProgressResponseDto = new Stage4ProgressDto();
        stage4ProgressResponseDto.setProgressId(stage4ProgressEntity.getProgressId());
        stage4ProgressResponseDto.setSessionId(stage4ProgressEntity.getSessionId());
        stage4ProgressResponseDto.setCurrentMissionId(stage4ProgressEntity.getCurrentMissionId());
        stage4ProgressResponseDto.setRemainingHearts(stage4ProgressEntity.getRemainingHearts());
        stage4ProgressResponseDto.setCurrentMissionCleared(stage4ProgressEntity.isCurrentMissionCleared());
        stage4ProgressResponseDto.setGameOver(stage4ProgressEntity.isGameOver());

        return stage4ProgressResponseDto;
    }
}
