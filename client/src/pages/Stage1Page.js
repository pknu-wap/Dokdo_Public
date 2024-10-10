import styles from './Stage1Page.module.css';
import ToolBar from '../components/ToolBar.js';
import { useEffect, useState } from 'react';
import Door from '../assets/Stage2Door.png';

function BeatButton({ bpm }) {
  const [isCorrectTiming, setIsCorrectTiming] = useState(false); /* 박자 맞춰 클릭했는지 여부 */
  const [clickTimestamps, setClickTimestamps] = useState([]); /* 클릭 타임 스탬프 저장 */
  const [timer, setTimer] = useState(null); /* 타이머 상태 */

  /* 각 박자에 대한 간격 (밀리초) */
  const beatCounts = [3, 3, 7]; /* 3-3-7 박자 */
  const totalClicksRequired = 13; /* 필요한 클릭 수 */
  const minGapBetweenBeats = 200; /* 비트 간 최소 간격 (100ms) */

  const handleClickDoor = () => {
    /* 필요 이상의 클릭 시 감지하지 않음 */
    if ((clickTimestamps.length >= totalClicksRequired) | isCorrectTiming) {
      return;
    }

    const currentTime = Date.now();
    setClickTimestamps((prev) => [...prev, currentTime]); /* 클릭 타임스탬프 저장 */

    if (clickTimestamps.length >= totalClicksRequired - 1) {
      checkSuccess();
    }

    resetTimer();
  };

  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer); /* 기존 타이머 클리어 */
    }
    /* 일정 시간 후에 타이머 리셋 */
    const newTimer = setTimeout(() => {
      resetAll(); /* 리셋 */
    }, 2000); /* 1초 후 리셋 */
    setTimer(newTimer); /* 새 타이머 설정 */
  };

  const checkSuccess = () => {
    // if (clickTimestamps.length !== totalClicksRequired) {
    //   setIsCorrectTiming(false);
    //   resetAll();
    //   return;
    // }

    /* 각 비트 간의 간격을 확인 */
    for (let i = 1; i < clickTimestamps.length; i++) {
      const gap = clickTimestamps[i] - clickTimestamps[i - 1];
      if (gap < minGapBetweenBeats) {
        setIsCorrectTiming(false);
        resetAll();
        return;
      }
    }

    setIsCorrectTiming(true);
    alert('성공!');
    resetAll();
  };

  const resetAll = () => {
    setClickTimestamps([]);
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  return (
    <>
      <button className={styles.Stage1DoorBtn} onClick={handleClickDoor}>
        <img className={styles.Stage1DoorImg} src={Door} />
      </button>
    </>
  );
}

function Stage1Page() {
  const [isStage1DoorOpen, setIsStage1DoorOpen] = useState(true);

  return (
    <>
      <ToolBar isStage2Open={isStage1DoorOpen} />
      <div className={styles.Stage1Bg}>
        <BeatButton />
      </div>
    </>
  );
}

export default Stage1Page;
