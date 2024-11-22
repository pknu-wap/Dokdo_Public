import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
import dokdoPuzzle4 from '../assets/clover4.png';

function Stage4Room2() {
  const { addItem } = useInventory2(); /* Context에서 items도 가져옴 */
  const [items, setItems] = useState([]);
  const { user, fetchUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  
  const initialHearts = parseInt(localStorage.getItem('hearts'), 10) || location.state?.hearts || 3;   /* 하트 상태를 로컬 스토리지에서 불러오기 */
  const [hearts, setHearts] = useState(initialHearts);
  const [isDokdoPuzzleVisible, setIsDokdoPuzzleVisible] = useState(true);


  /* 아이템 추가 함수 */
  let isAddingItem = false;

  const handleItemClick = async (itemId) => {
    if (isAddingItem) return; /* 이미 추가 요청 중이면 아무 작업도 하지 않음 */ 
  
    if (!user?.sessionId) {
      console.log('Session ID가 없습니다.');
      return;
    }
  
    if (items.some(item => item.id === itemId)) {
      console.log('이미 추가된 아이템입니다.');
      return;
    }
  
    try {
      isAddingItem = true; /* 추가 요청 시작 */ 
      await addItem({ sessionId: user.sessionId, itemId });
      setItems(prevItems => [...prevItems, { id: itemId }]); /*즉시 로컬 업데이트*/ 
     
      const updatedUser = await fetchUser();
      if (updatedUser?.inventory) {
        setItems(updatedUser.inventory);
      }
      console.log("업데이트된 인벤토리:", updatedUser.inventory);
    } catch (error) {
      console.error('아이템 추가 중 오류 발생', error);
    } finally {
      isAddingItem = false; /* 추가 요청 종료 */ 
    }
  };

  useEffect(() => {
    localStorage.setItem('hearts', hearts); /* 하트 상태를 로컬 스토리지에 저장 */

      if (hearts === 0) {
        navigate('/gameover'); /* 하트가 0이면 gameover 페이지로 이동 */
        }
      }, [hearts, navigate]);

  const handleDragStart = (foodType) => (e) => {   /* 드래그 시작 처리 */
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

  const handleDokdoPuzzleClick = () => {
    handleItemClick(4);
    setIsDokdoPuzzleVisible(false);
    console.log('독도 퍼즐 조각이 인벤토리에 추가됨');
  };

  return (
    <div className={styles.Stage4Bg}>
      <div className={styles.TopBar}>
        박환영을 죽일 수 있는 독이 든 음식을 선택하라
      </div>
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
        <img className={styles.ParkHwanyoung} src={ParkHwanyoung} alt="ParkHwanyoung" onDragStart={(e) => e.preventDefault()}/>
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
