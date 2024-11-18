import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Stage4Room1.module.css';
import Inventory from '../components/Inventory.js';
import KimChunsam from 'assets/stage4/KimChunsam.png';
import Heart from 'assets/stage4/Heart.png';
import Gun_Black from 'assets/stage4/Gun_Black.png';
import Gun_Gray from 'assets/stage4/Gun_Gray.png';
import Gun_White from 'assets/stage4/Gun_White.png';

function Stage4Room1() {
  const [hearts, setHearts] = useState(3); /* 하트 상태 */
  const navigate = useNavigate();

  /* 드래그 시작 처리 */
  const handleDragStart = (gunType) => (e) => {
    e.dataTransfer.setData('text/plain', gunType); /* 드래그 데이터를 설정 */
  };

  /* 드롭 처리 */
  const handleDrop = (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');

    if (draggedItem === 'correctGun') {
      navigate('/stage4room2'); /* 정답일 경우 다음 방으로 이동 */
    } else {
      setHearts((prevHearts) => {
        const updatedHearts = Math.max(prevHearts - 1, 0); /* 하트 감소 */
        if (updatedHearts === 0) {
          alert('게임 오버!');
          navigate('/gameover'); /* 하트가 0이 되면 게임 오버 페이지로 이동 */
        }
        return updatedHearts;
      });
    }
  };

  return (
    <div className={styles.Stage4Bg}>
      <div className={styles.TopBar}>
        김춘삼을 죽일 수 있는 총을 선택하라 
      </div>
      <Inventory />
      {/* 하트 표시 */}
      <div className={styles.Heart}>
        {Array.from({ length: hearts }, (_, i) => (
          <img key={i} src={Heart} alt="Heart" />
        ))}
      </div>

      {/* 김춘삼 이미지 (드롭 영역) */}
      <div
        className={styles.KimChunsamWrapper}
        onDragOver={(e) => e.preventDefault()} /* 드롭 가능 영역 설정 */
        onDrop={handleDrop} /* 드롭 처리 */
      >
        <img className={styles.KimChunsam} src={KimChunsam} alt="KimChunsam" />
      </div>

      {/* 총 이미지들 (드래그 가능) */}
      <div className={styles.Guns}>
        <img
          /* className={styles.Gun_Black} */
          draggable="true"
          onDragStart={handleDragStart('wrongGun1')}
          src={Gun_Black}
          alt="Gun_Black"
        />
        <img
          /* className={styles.Gun_Gray} */
          draggable="true"
          onDragStart={handleDragStart('correctGun')}
          src={Gun_Gray}
          alt="Gun_Gray"
        />
        <img
          /* className={styles.Gun_White} */
          draggable="true"
          onDragStart={handleDragStart('wrongGun2')}
          src={Gun_White}
          alt="Gun_White"
        />
      </div>
    </div>
  );
}

export default Stage4Room1;
