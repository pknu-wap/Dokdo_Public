import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'context/UserContext';

import styles from './Stage4Room3.module.css';
import Inventory from '../components/Inventory.js';

import Heart from 'assets/stage4/Heart.png';
import SonJeongpal from 'assets/stage4/SonJeongpal.png';
import Yeontan from 'assets/stage4/Yeontan.png';
import Bomb from 'assets/stage4/Bomb.png';
import Dokki from 'assets/stage4/Dokki.png';
import Table from 'assets/stage4/Table.png';

function Stage4Room3() {
  const navigate = useNavigate();
  const { missionClear, getHearts, hearts } = useUser();
  const [banner, setBanner] = useState('');

  useEffect(() => {
    const updatedHearts = getHearts(6);

    /* 하트가 0이면 gameover 페이지로 이동 */
    if (updatedHearts === 0) {
      navigate('/gameOver');
    }
  }, [hearts, navigate]);

  /* 드래그 시작 처리 */
  const handleDragStart = (weaponType) => (e) => {
    e.dataTransfer.setData('text/plain', weaponType); /*  드래그 데이터를 설정 */
  };

  /* 드롭 처리 */
  const handleDrop = async (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');

    if (!draggedItem) {
      console.log('드래그된 데이터가 유효하지 않습니다.');
      return;
    }
    try {
      const response = await missionClear({ stageId: 6, itemName: draggedItem });
      console.log('missionClear 응답:', response);
      getHearts(6);

      if (response.remainingHearts === 0) {
        navigate('/gameOver');
      }

      if (response.cleared === true) {
        navigate('/stage4PuzzleGame');
      }
    } catch (error) {
      console.log('드래그 앤 드랍 미션 오류', error);
      setBanner('이미 클리어 된 스테이지입니다.');
      setTimeout(() => setBanner(''), 1000);
    }
  };

  return (
    <div className={styles.Stage4Bg}>
      <div className={styles.TopBarBg}>
        <div className={styles.TopBar}>손정팔을 죽일 수 있는 무기를 선택하라</div>
        {/* 하트 표시 */}
        <div className={styles.Heart}>
          {hearts > 0 && (
            <>
              {Array.from({ length: hearts }, (_, i) => (
                <img key={i} src={Heart} alt="Heart" />
              ))}
            </>
          )}
        </div>
      </div>
      <Inventory />
      <div className={styles.Stage4Floor} />

      {/* 손정팔 이미지 (드롭 영역) */}
      <div
        className={styles.SonJeongpalWrapper}
        onDragOver={(e) => e.preventDefault()} // 드롭 가능 영역 설정
        onDrop={handleDrop} // 드롭 처리
      >
        <img
          className={styles.SonJeongpal}
          src={SonJeongpal}
          alt="SonJeongpal"
          onDragStart={(e) => e.preventDefault()}
        />
      </div>

      <img className={styles.Table} src={Table} alt="Table" />
      {/* 무기 이미지들 (드래그 가능) */}
      <div className={styles.Weapon}>
        <img draggable="true" onDragStart={handleDragStart('wrongweapon1')} src={Yeontan} alt="Yeontan" />
        <img draggable="true" onDragStart={handleDragStart('correctweapon')} src={Bomb} alt="Bomb" />
        <img draggable="true" onDragStart={handleDragStart('wrongweapon2')} src={Dokki} alt="Dokki" />
      </div>

      {banner && (
        <div className={styles.Banner}>
          <p>{banner}</p>
        </div>
      )}
    </div>
  );
}

export default Stage4Room3;
