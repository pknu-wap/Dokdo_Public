import styles from './Stage1Page.module.css';
import ToolBar from '../components/ToolBar.js';
import Inventory from '../components/Inventory.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DoorClose from '../Dokdo_Private/stage1/Stage1DoorClose.png';
import DoorOpen from '../Dokdo_Private/stage1/Stage1DoorOpen.png';
import Table from '../Dokdo_Private/stage1/Stage1Table.png';
import Music from '../Dokdo_Private/stage1/Music.png';
import DrawerClose from '../Dokdo_Private/stage1/Stage1DrawerClose.png';
import DrawerOpen from '../Dokdo_Private/stage1/Stage1DrawerOpen.png';
import RedItem from '../Dokdo_Private/stage1/RedItem.png';
import { useInventory } from '../context/InventoryContext.js';

function BeatButton() {
  const [isCorrectTiming, setIsCorrectTiming] = useState(false); /* 박자 맞춰 클릭했는지 여부 */
  const [clickTimestamps, setClickTimestamps] = useState([]); /* 클릭 타임 스탬프 저장 */
  const [timer, setTimer] = useState(null); /* 타이머 상태 */

  useEffect(() => {
    const savedDoorState = sessionStorage.getItem('stage1Door');
    if (savedDoorState === 'true') {
      setIsCorrectTiming(true);
    }
  });

  const navigate = useNavigate();

  const handleClickOpenDoor = () => {
    navigate('/stage2');
  };

  /* 각 박자에 대한 간격 (밀리초) */
  const beatCounts = [3, 3, 7]; /* 3-3-7 박자 */
  const totalClicksRequired = 13; /* 필요한 클릭 수 */
  const minGapBetweenBeats = 200; /* 비트 간 최소 간격 (200ms) */

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
    sessionStorage.setItem('stage1Door', 'true');
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
  const isStage1DoorOpen = true;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { items, addItem } = useInventory(); /* Context에서 items와 addItem 함수 가져옴 */

  const handleDrawerClick = () => {
    const newDrawerState = !isDrawerOpen;
    setIsDrawerOpen(newDrawerState);
  };

  /* 아이템을 클릭했을 때 인벤토리에 추가하는 함수 */
  const handleItemClick = () => {
    addItem('RedItem');
    console.log(items);
  };

  return (
    <>
      <ToolBar isStage2Open={isStage1DoorOpen} />
      <Inventory />
      <div className={styles.Stage1Bg}>
        <div className={styles.Stage1Floor} />
        <BeatButton />
        <img className={styles.Stage1Table} src={Table} />
        <img className={styles.Stage1Music} src={Music} />
        {isDrawerOpen ? (
          <>
            <img
              className={`${styles.Stage1Drawer} ${styles.Stage1DrawerOpen}`}
              src={DrawerOpen}
              onClick={handleDrawerClick}
            />
            <img
              className={`${styles.Stage1Drawer} ${styles.Stage1DrawerOpen} ${styles.Stage1Item} ${
                items.includes('RedItem') ? styles.hidden : ''
              }`}
              src={RedItem}
              onClick={() => handleItemClick('RedItem')}
            />
          </>
        ) : (
          <img
            className={`${styles.Stage1Drawer} ${styles.Stage1DrawerClose} `}
            src={DrawerClose}
            onClick={handleDrawerClick}
          />
        )}
      </div>
    </>
  );
}

export default Stage1Page;
