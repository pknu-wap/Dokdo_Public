import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './Stage4Room3.module.css';
import Inventory from '../components/Inventory.js';
import Heart from 'assets/stage4/Heart.png';

import SonJeongpal from 'assets/stage4/SonJeongpal.png';
import Yeontan from 'assets/stage4/Yeontan.png';
import Bomb from 'assets/stage4/Bomb.png';
import Dokki from 'assets/stage4/Dokki.png';
import Table from 'assets/stage4/Table.png';

function Stage4Room3() {
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
  const handleDragStart = (weaponType) => (e) => {
    e.dataTransfer.setData('text/plain', weaponType); // 드래그 데이터를 설정
  };

  /* 드롭 처리 */
  const handleDrop = (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');

    if (draggedItem === 'correctweapon') {
      navigate('/Stage4PuzzleGame', { state: { hearts } }); // 정답일 경우 다음 방으로 이동
    } else {
      setHearts((prevHearts) => Math.max(prevHearts - 1, 0)); // 하트 감소
    }
  };

  const resetHearts = () => {
    localStorage.removeItem('hearts'); /* 로컬 스토리지 초기화 */
    setHearts(3); /* 하트 초기화 */ 
  };

  return (
    <div className={styles.Stage4Bg}>
      <div className={styles.TopBar}>
      손정팔을 죽일 수 있는 무기를 선택하라.
      </div>
      <Inventory />

      <div className={styles.Heart}>
        {Array.from({ length: hearts }, (_, i) => (
          <img key={i} src={Heart} alt="Heart" />
        ))}
      </div>

      {/* 손정팔 이미지 (드롭 영역) */}
      <div
        className={styles.SonJeongpalWrapper}
        onDragOver={(e) => e.preventDefault()} // 드롭 가능 영역 설정
        onDrop={handleDrop} // 드롭 처리
      >
        <img className={styles.SonJeongpal} src={SonJeongpal} alt="SonJeongpal" />
      </div>

      {/* 무기 이미지들 (드래그 가능) */}
      <div className={styles.Weapon}>
        <img
          draggable="true"
          onDragStart={handleDragStart('wrongweapon1')}
          src={Yeontan}
          alt="Yeontan"
        />
        <img
          draggable="true"
          onDragStart={handleDragStart('correctweapon')}
          src={Bomb}
          alt="Bomb"
        />
        <img
          draggable="true"
          onDragStart={handleDragStart('wrongweapon2')}
          src={Dokki}
          alt="Dokki"
        />
      </div>
      <img className={styles.Table} src={Table} alt="Table" />
    </div>
  );
}

export default Stage4Room3;
