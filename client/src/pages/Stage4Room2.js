import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './Stage4Room2.module.css';
import Inventory from '../components/Inventory.js';
import Heart from 'assets/stage4/Heart.png';

import ParkHwanyoung from 'assets/stage4/ParkHwanyoung.png';
import Bibimbap from 'assets/stage4/Bibimbap.png';
import Hallabong from 'assets/stage4/Hallabong.png';
import Eomuk from 'assets/stage4/Eomuk.png';
import Table from 'assets/stage4/Table.png';

function Stage4Room2() {
  const location = useLocation();
  const navigate = useNavigate();

  /* 하트 상태를 로컬 스토리지에서 불러오기 */
  const initialHearts = parseInt(localStorage.getItem('hearts'), 10) || location.state?.hearts || 3;
  const [hearts, setHearts] = useState(initialHearts);

  /* 하트 상태를 로컬 스토리지에 저장 */
  useEffect(() => {
    localStorage.setItem('hearts', hearts);

    /* 하트가 0이면 gameover 페이지로 이동 */
    if (hearts === 0) {
      /* alert('실패'); */ 
      navigate('/gameover');
    }
  }, [hearts, navigate]);

  /* 드래그 시작 처리 */
  const handleDragStart = (foodType) => (e) => {
    e.dataTransfer.setData('text/plain', foodType); // 드래그 데이터를 설정
  };

  /* 드롭 처리 */
  const handleDrop = (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');

    if (draggedItem === 'correctfood') {
      navigate('/Stage4room3', { state: { hearts } }); // 정답일 경우 다음 방으로 이동
    } else {
      setHearts((prevHearts) => Math.max(prevHearts - 1, 0)); // 하트 감소
    }
  };

  /* room2에서 게임 재시작 시 하트 초기화 */
  const resetHearts = () => {
    localStorage.removeItem('hearts'); /* 로컬 스토리지 초기화 */
    setHearts(3); /* 하트 초기화 */ 
  };

  return (
    <div className={styles.Stage4Bg}>
      <div className={styles.TopBar}>
        박완영을 죽일 수 있는 독이 든 음식을 선택하라
      </div>
      <Inventory />

      {/* 하트 표시 */}
      <div className={styles.Heart}>
        {Array.from({ length: hearts }, (_, i) => (
          <img key={i} src={Heart} alt="Heart" />
        ))}
      </div>

      {/* 박완영 이미지 (드롭 영역) */}
      <div
        className={styles.ParkHwanyoungWrapper}
        onDragOver={(e) => e.preventDefault()} // 드롭 가능 영역 설정
        onDrop={handleDrop} // 드롭 처리
      >
        <img className={styles.ParkHwanyoung} src={ParkHwanyoung} alt="ParkHwanyoung" />
      </div>

      {/* 음식 이미지들 (드래그 가능) */}
      <div className={styles.Food}>
        <img
          draggable="true"
          onDragStart={handleDragStart('correctfood')}
          src={Bibimbap}
          alt="Bibimbap"
        />
        <img
          draggable="true"
          onDragStart={handleDragStart('wrongfood1')}
          src={Hallabong}
          alt="Hallabong"
        />
        <img
          draggable="true"
          onDragStart={handleDragStart('wrongfood2')}
          src={Eomuk}
          alt="Eomuk"
        />
      </div>
      <img className={styles.Table} src={Table} alt="Table" />
    </div>
  );
}

export default Stage4Room2;
