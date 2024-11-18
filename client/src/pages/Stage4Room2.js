import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './Stage4Room2.module.css';
import Inventory from '../components/Inventory.js';
import Heart from 'assets/stage4/Heart.png';

import ParkHwanyoung from 'assets/stage4/ParkHwanyoung.png';
import Bibimbap from 'assets/stage4/Bibimbap.png';
import Hallabong from 'assets/stage4/Hallabong.png';
import Eomuk from 'assets/stage4/Eomuk.png';

function Stage4Room2() {
  const location = useLocation();
  const [hearts, setHearts] = useState(location.state?.hearts || 3); // 하트 상태
  const navigate = useNavigate();

  // 드래그 시작 처리
  const handleDragStart = (gunType) => (e) => {
    e.dataTransfer.setData('text/plain', gunType); // 드래그 데이터를 설정
  };

  // 드롭 처리
  const handleDrop = (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');

    if (draggedItem === 'correctfood') {
      navigate('/stge4room3', { state: { hearts } }); // 정답일 경우 다음 방으로 이동
    } else {
      setHearts((prevHearts) => {
        const updatedHearts = Math.max(prevHearts - 1, 0); // 하트 감소
        if (updatedHearts === 0) {
          alert('게임 오버!');
          navigate('/gameover'); // 하트가 0이 되면 게임 오버 페이지로 이동
        }
        return updatedHearts;
      });
    }
  };

  return (
    <div className={styles.Stage4Bg}>
      <div className={styles.TopBar}>
        박완영을 죽일 수 있는 독이 든 음식을 선택하라 </div>
      <Inventory />
      {/* 하트 표시 */}
      <div className={styles.Heart}>
        {Array.from({ length: hearts }, (_, i) => (
          <img key={i} src={Heart} alt="Heart" />
        ))}
      </div>

      {/* 김춘삼 이미지 (드롭 영역) */}
      <div
        className={styles.ParkHwanyoungWrapper}
        onDragOver={(e) => e.preventDefault()} // 드롭 가능 영역 설정
        onDrop={handleDrop} // 드롭 처리
      >
        <img className={styles.ParkHwanyoung} src={ParkHwanyoung} alt="ParkHwanyoung" />
      </div>

      {/* 총 이미지들 (드래그 가능) */}
      <div className={styles.Food}>
        <img
          draggable="true"
          onDragStart={handleDragStart('correctfood')}
          src={Bibimbap}
          alt="Bibimbap"
        />
        <img
          draggable="true"
          onDragStart={handleDragStart('wrongFood1')}
          src={Hallabong}
          alt="Hallabong"
        />
        <img
          draggable="true"
          onDragStart={handleDragStart('wrongFood2')}
          src={Eomuk}
          alt="Eomuk"
        />
      </div>
    </div>
  );
}

export default Stage4Room2;
