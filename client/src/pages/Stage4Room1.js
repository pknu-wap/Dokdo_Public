import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Stage4Room1.module.css';
import Inventory from '../components/Inventory.js';
import { useUser } from 'context/UserContext';

import Heart from 'assets/stage4/Heart.png';
import KimChunsam from 'assets/stage4/KimChunsam.png';
import Gun_Black from 'assets/stage4/Gun_Black.png';
import Gun_Gray from 'assets/stage4/Gun_Gray.png';
import Gun_White from 'assets/stage4/Gun_White.png';
import Table from 'assets/stage4/Table.png';

function Stage4Room1() {
  const navigate = useNavigate();
  const { missionClear, getHearts, hearts } = useUser();
  const [banner, setBanner] = useState('');

  useEffect(() => {
    getHearts(4);

    /* 하트가 0이면 gameover 페이지로 이동 */
    if (hearts === 0) {
      navigate('/gameOver');
    }
  }, [hearts, navigate]);

  /* 드래그 시작 처리 */
  const handleDragStart = (gunType) => (e) => {
    e.dataTransfer.setData('text/plain', gunType); /* 드래그 데이터를 설정 */
  };

  /* 드래그 오버 처리 */
  const handleDragOver = (e) => {
    e.preventDefault(); // 드롭 허용
  };

  /* 드롭 처리 */
  const handleDrop = async (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');
    console.log('드래그된 데이터:', draggedItem);
    if (!draggedItem) {
      console.log('드래그된 데이터가 유효하지 않습니다.');
      return;
    }
    try {
      const response = await missionClear({ stageId: 4, itemName: draggedItem });
      console.log('missionClear 응답:', response);
      getHearts(4);

      if (response.remainingHearts === 0) {
        navigate('/gameOver');
      }
      if (response.cleared === true) {
        navigate('/stage4room2');
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
        <div className={styles.TopBar}>김춘삼을 죽일 수 있는 총을 선택하라</div>
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

      {/* 김춘삼 이미지 (드롭 영역) */}
      <div
        className={styles.KimChunsamWrapper}
        onDragOver={handleDragOver} /* 드롭 가능 영역 설정 */
        onDrop={handleDrop} /* 드롭 처리 */
      >
        <img className={styles.KimChunsam} src={KimChunsam} alt="KimChunsam" />
      </div>
      <img className={styles.Table} src={Table} alt="Table" />
      {/* 총 이미지들 (드래그 가능) */}
      <div className={styles.Guns}>
        <img draggable="true" onDragStart={handleDragStart('correctGun')} src={Gun_Black} alt="Gun_Black" />
        <img draggable="true" onDragStart={handleDragStart('wrongGun1')} src={Gun_Gray} alt="Gun_Gray" />
        <img draggable="true" onDragStart={handleDragStart('wrongGun2')} src={Gun_White} alt="Gun_White" />
      </div>

      {banner && (
        <div className={styles.Banner}>
          <p>{banner}</p>
        </div>
      )}
    </div>
  );
}

export default Stage4Room1;
