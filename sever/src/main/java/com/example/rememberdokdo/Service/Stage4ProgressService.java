package com.example.rememberdokdo.Service;

import ch.qos.logback.core.pattern.parser.OptionTokenizer;
import com.example.rememberdokdo.Dto.Stage4ProgressDto;
import com.example.rememberdokdo.Entity.Stage4ProgressEntity;
import com.example.rememberdokdo.Repository.Stage4ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.Comparator;
import java.util.ListIterator;
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
        if (sessionId == null || sessionId.isEmpty()) {
            throw new IllegalArgumentException("세션이 만료되었거나 유효하지 않습니다.");
        }

        // DB에서 세션 ID로 최신 진행 상황 조회
        Optional<Stage4ProgressEntity> latestProgressOptional = stage4ProgressRepository.findLatestBySessionId(sessionId);
        if (latestProgressOptional.isEmpty()) {
            throw new IllegalArgumentException("세션 ID에 대한 스테이지4 진행 정보가 없습니다.");
        }

        // 최신 진행 상황 엔티티 저장
        Stage4ProgressEntity latestProgress = latestProgressOptional.get();

        // 남은 하트 검사 => 게임 오버
        if (latestProgress.getRemainingHearts() <= 0) {
            throw new IllegalArgumentException("남은 하트가 없으므로 게임 오버되었습니다.");
        }

        // 현재 미션 진행 가능 여부 확인
        if (latestProgress.isCurrentMissionCleared()) {
            throw new IllegalArgumentException("현재 미션을 이미 클리어했으므로 미션 진행이 불가능합니다.");
        }

        // 미션 재도전
        int remainingHearts = latestProgress.getRemainingHearts();
        boolean gameOver = false;

        if (!isCurrentMissionCleared) {
            remainingHearts--;
            if (remainingHearts <= 0) {
                gameOver = true;
            }
        } else {
            isCurrentMissionCleared = true;
        }

        // 새로운 진행 상황 데이터 생성
        Stage4ProgressEntity newProgress = new Stage4ProgressEntity();
        newProgress.setSessionId(sessionId);
        newProgress.setStage3Cleared(true);
        newProgress.setCurrentMissionId(currentMissionId); // 현재 미션 번호
        newProgress.setRemainingHearts(remainingHearts); // 감소된 하트 반영
        newProgress.setCurrentMissionCleared(isCurrentMissionCleared); // 현재 미션 성공 여부
        newProgress.setGameOver(gameOver); // 게임 오버 상태 반영

        // 새로운 진행 상태를 저장
        stage4ProgressRepository.save(newProgress);

        // 응답 Dto 반환
        Stage4ProgressDto responseDto = new Stage4ProgressDto();
        responseDto.setProgressId(newProgress.getProgressId());
        responseDto.setSessionId(newProgress.getSessionId());
        responseDto.setCurrentMissionId(newProgress.getCurrentMissionId());
        responseDto.setRemainingHearts(newProgress.getRemainingHearts());
        responseDto.setCurrentMissionCleared(newProgress.isCurrentMissionCleared());
        responseDto.setGameOver(newProgress.isGameOver());

        return responseDto;
    }


    // 초기화(게임 오버) 기능
    public Stage4ProgressDto resetStage4(String sessionId) {
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
