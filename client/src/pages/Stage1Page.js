import styles from './Stage1Page.module.css';
import ToolBar from '../components/ToolBar.js';
import Inventory from '../components/Inventory.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory2 } from 'context/InventoryContext2';
import { useUser } from 'context/UserContext';

import Stage1Memo from 'assets/stage1/Stage1Memo.png';
import DoorClose from 'assets/stage1/Stage1DoorClose.png';
import DoorOpen from 'assets/stage1/Stage1DoorOpen.png';
import Table from 'assets/stage1/Stage1Table.png';
import Music from 'assets/stage1/Music.png';
import DrawerClose from 'assets/stage1/Stage1DrawerClose.png';
import DrawerOpen from 'assets/stage1/Stage1DrawerOpen.png';
import TaegeukKey from 'assets/stage1/TaegeukCut.png';
import Lamp from 'assets/stage1/Stage1Lamp.png';
import Light from 'assets/stage1/Stage1LampLight.png';
import Clover from '../assets/clover.png';

function BeatDoor() {
  const [isCorrectTiming, setIsCorrectTiming] = useState(false); /* 박자 맞춰 클릭했는지 여부 */
  const [clickTimestamps, setClickTimestamps] = useState([]); /* 클릭 타임 스탬프 저장 */
  const [timer, setTimer] = useState(null); /* 타이머 상태 */
  const { stageClear, user } = useUser();

  useEffect(() => {
    if (user?.stages[0]) {
      const savedDoorState = user.stages[0].cleared;
      if (savedDoorState === true) {
        setIsCorrectTiming(true);
      }
    }
  }, []);

  const navigate = useNavigate();

  const handleClickOpenDoor = () => {
    navigate('/stage2');
  };

  /* 각 박자에 대한 간격 (밀리초) */
  const beatCounts = [3, 3, 7]; /* 3-3-7 박자 */
  const totalClicksRequired = 13; /* 필요한 클릭 수 */
  const minGapBetweenBeats = 180; /* 비트 간 최소 간격 (200ms) */

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
    }, 1000); /* 1초 후 리셋 */
    setTimer(newTimer); /* 새 타이머 설정 */
  };

  const checkSuccess = () => {
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
    stageClear(1);

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
      {isCorrectTiming ? (
        <img
          className={`${styles.Stage1DoorImg} ${styles.Stage1DoorOpen}`}
          src={DoorOpen}
          onClick={handleClickOpenDoor}
        />
      ) : (
        <img
          className={`${styles.Stage1DoorImg} ${styles.Stage1DoorClose}`}
          src={DoorClose}
          onClick={handleClickDoor}
        />
      )}
    </>
  );
}

function Stage1Page() {
  const [isMemoShow, setIsMemoShow] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMusicExpand, setIsMusicExpand] = useState(false);
  const [isLampOn, setIsLampOn] = useState(false);
  const [isStage2Open, setIsStage2Open] = useState(true);
  const [isStage3Open, setIsStage3Open] = useState(true);

  const { user, fetchUser } = useUser();
  const [items, setItems] = useState([]);

  const { addItem } = useInventory2();

  useEffect(() => {
    fetchUser();
    if (user?.inventory) {
      setItems(user.inventory);
    }
    if (user?.stages) {
      if (user.stages[0]) {
        setIsStage2Open(true);
      }
      if (user.stages[1]) {
        setIsStage3Open(true);
      }
    }
    if (!user) {
      setIsMemoShow(true);
    }
  }, []);

  const handleDrawerClick = () => {
    const newDrawerState = !isDrawerOpen;
    setIsDrawerOpen(newDrawerState);
  };

  const handleMusicClick = () => {
    setIsMusicExpand(true);
  };

  const handleLampClick = () => {
    const newLampState = !isLampOn;
    setIsLampOn(newLampState);
  };

  const handleBgClick = () => {
    setIsMusicExpand(false);
    setIsMemoShow(false);
  };

  /* 아이템을 클릭했을 때 인벤토리에 추가하는 함수 */
  const handleItemClick = async (itemId) => {
    if (!user?.sessionId) {
      console.log('Session ID가 없습니다.');
      return;
    }

    try {
      await addItem({ sessionId: user.sessionId, itemId });
      /* 유저 정보 업데이트 */
      const updatedUser = await fetchUser();

      if (updatedUser?.inventory) {
        setItems(updatedUser.inventory);
      }
      console.log(updatedUser.inventory);
    } catch (error) {
      console.error('아이템 추가 중 오류 발생', error);
    }
  };

  return (
    <>
      <ToolBar isStage2Open={isStage2Open} isStage3Open={isStage3Open} />
      <Inventory />
      <div className={styles.Stage1Bg}>
        <div className={styles.Stage1Floor} />
        <BeatDoor />

        <div className={styles.Stage1LampBox}>
          <img className={`${styles.Stage1Light} ${isLampOn ? '' : styles.hidden}`} src={Light} />
          <img className={styles.Stage1Lamp} src={Lamp} onClick={handleLampClick} />
        </div>
        <div className={styles.Stage1TableBox}>
          <img className={styles.Stage1Table} src={Table} />
          <img
            className={`${styles.Stage1Drawer} ${styles.Stage1DrawerOpen} ${styles.Stage1Puzzle} ${
              items && items.some((item) => item.itemName === 'dokdoPuzzle1') ? styles.hidden : ''
            }`}
            src={Clover}
            onClick={() => handleItemClick(1)}
          />
        </div>
        <img className={styles.Stage1Music} src={Music} onClick={handleMusicClick} />

        {isDrawerOpen ? (
          <div className={styles.Stage1DrawerBox}>
            <img
              className={`${styles.Stage1Drawer} ${styles.Stage1DrawerOpen}`}
              src={DrawerOpen}
              onClick={handleDrawerClick}
            />
            <img
              className={`${styles.Stage1Drawer} ${styles.Stage1DrawerOpen} ${styles.Stage1TaegeukKey} ${
                items.some((item) => item.itemName === 'taegeukKey') ? styles.hidden : ''
              }`}
              src={TaegeukKey}
              onClick={() => handleItemClick(5)}
            />
          </div>
        ) : (
          <img
            className={`${styles.Stage1Drawer} ${styles.Stage1DrawerClose} `}
            src={DrawerClose}
            onClick={handleDrawerClick}
          />
        )}

        {isMusicExpand && (
          <div className={styles.Stage1ObjectBg} onClick={handleBgClick}>
            <img src={Music} className={styles.Stage1MusicExpand} />
          </div>
        )}
        {isMemoShow && (
          <div className={styles.Stage1ObjectBg} onClick={handleBgClick}>
            <img src={Stage1Memo} className={styles.Stage1Memo} />
          </div>
        )}
      </div>
    </>
  );
}

export default Stage1Page;
