import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory2 } from '../context/InventoryContext2';
import { useUser } from '../context/UserContext';

import styles from './Stage4Room2.module.css';
import Inventory from '../components/Inventory.js';

import Heart from 'assets/stage4/Heart.png';
import ParkHwanyoung from 'assets/stage4/ParkHwanyoung.png';
import Bibimbap from 'assets/stage4/Bibimbap.png';
import Hallabong from 'assets/stage4/Hallabong.png';
import Eomuk from 'assets/stage4/Eomuk.png';
import Table from 'assets/stage4/Table.png';
import dokdoPuzzle4 from '../assets/dokdoPuzzle4.png';

function Stage4Room2() {
  const { addItem } = useInventory2();
  const [items, setItems] = useState([]);
  const { user, fetchUser } = useUser();
  const navigate = useNavigate();

  const [isDokdoPuzzleVisible, setIsDokdoPuzzleVisible] = useState(true);

  const { missionClear, getHearts, hearts } = useUser();

  useEffect(() => {
    fetchUser();
    getHearts(5);

    /* 하트가 0이면 gameover 페이지로 이동 */
    if (hearts === 0) {
      navigate('/gameOver');
    }
  }, [hearts, navigate]);

  const handleItemClick = async (itemId) => {
    if (!user?.sessionId) {
      console.log('Session ID가 없습니다.');
      return;
    }

    if (items.some((item) => item.id === itemId)) {
      console.log('이미 추가된 아이템입니다.');
      return;
    }

    try {
      await addItem({ sessionId: user.sessionId, itemId });

      const updatedUser = await fetchUser();
      if (updatedUser?.inventory) {
        setItems(updatedUser.inventory);
      }
      console.log('업데이트된 인벤토리:', updatedUser.inventory);
    } catch (error) {
      console.error('아이템 추가 중 오류 발생', error);
    }
  };

  const handleDragStart = (foodType) => (e) => {
    /* 드래그 시작 처리 */
    e.dataTransfer.setData('text/plain', foodType); // 드래그 데이터를 설정
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
      const response = await missionClear({ stageId: 5, itemName: draggedItem });
      console.log('missionClear 응답:', response);

      const updatedHearts = await getHearts(4);
      if (updatedHearts === 0) {
        navigate('/gameOver');
      }

      if (response.cleared === true) {
        navigate('/stage4room3');
      }
    } catch (error) {
      console.log('드래그 앤 드랍 미션 오류', error);
    }
  };

  const handleDokdoPuzzleClick = () => {
    handleItemClick(4);
    setIsDokdoPuzzleVisible(false);
    console.log('독도 퍼즐 조각이 인벤토리에 추가됨');
  };

  return (
    <div className={styles.Stage4Bg}>
      <div className={styles.TopBar}>박환영을 죽일 수 있는 독이 든 음식을 선택하라</div>
      <Inventory />

      {/* 독도 퍼즐 조각 이미지 */}
      {isDokdoPuzzleVisible && (
        <img
          className={styles.DokdoPuzzle4}
          src={dokdoPuzzle4}
          alt="독도 퍼즐 조각4"
          onClick={handleDokdoPuzzleClick}
        />
      )}

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
        <img
          className={styles.ParkHwanyoung}
          src={ParkHwanyoung}
          alt="ParkHwanyoung"
          onDragStart={(e) => e.preventDefault()}
        />
      </div>

      {/* 음식 이미지들 (드래그 가능) */}
      <div className={styles.Food}>
        <img draggable="true" onDragStart={handleDragStart('correctfood')} src={Bibimbap} alt="Bibimbap" />
        <img draggable="true" onDragStart={handleDragStart('wrongfood1')} src={Hallabong} alt="Hallabong" />
        <img draggable="true" onDragStart={handleDragStart('wrongfood2')} src={Eomuk} alt="Eomuk" />
      </div>
      <img className={styles.Table} src={Table} alt="Table" />
    </div>
  );
}

export default Stage4Room2;
