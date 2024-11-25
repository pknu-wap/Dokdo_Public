import styles from './Stage2Page.module.css';
import ToolBar from '../components/ToolBar.js';
import Inventory from '../components/Inventory.js';
import Modal from '../components/Modal.js';
import Book from '../components/Book.js';
import CheckNumber from '../components/CheckNumber.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory2 } from 'context/InventoryContext2';
import { useUser } from 'context/UserContext';

import BoxOpen from 'assets/stage2/OpenBox.png';
import BoxClose from 'assets/stage2/Box.png';
import Door from 'assets/stage2/Door.png';
import BookShelf from 'assets/stage2/BookShelf.png';
import ContainMapBook from 'assets/stage2/ContainMapBook.png';
import Lamp from 'assets/stage2/Lamp.png';
import DoorOpen from 'assets/stage2/DoorOpen.png';
import timeLocationHint from 'assets/stage2/timeLocationHintCut.png';
import BoxOpenAfter from 'assets/stage2/BoxOpenAfter.png';
import dokdoPuzzle2 from 'assets/dokdoPuzzle2.png';

function Stage2Page() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { addItem, deleteItem } = useInventory2();

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

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem({ sessionId: user.sessionId, itemId });
      const updatedUser = await fetchUser();

      if (updatedUser?.inventory) {
        setItems(updatedUser.inventory);
      }
      console.log(updatedUser.inventory);
    } catch (error) {
      console.error('아이템 삭제 중 오류 발생', error);
    }
  };

  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [isHandleBoxOpen, setIsHandleBoxOpen] = useState(false);
  const [isStage2Open, setIsStage2Open] = useState(true);
  const [isStage3Open, setIsStage3Open] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [checkPlaceAnswer, setCheckIsPlaceAnswer] = useState(false);
  const [placeAnswer, setPlaceAnswer] = useState('');
  const [isMapFind, setIsMapFind] = useState(false);
  const [isTimeLocationHintFind, setIsTimeLocationHintFind] = useState(false);
  const [scoreValues, setScoreValues] = useState({
    number1: 0,
    number2: 0,
    number3: 0,
  });
  const [doorOpen, setDoorOpen] = useState(false);

  const { stageClear, user, fetchUser } = useUser();

  useEffect(() => {
    if (user?.inventory) {
      setItems(user.inventory);
    }
    fetchUser();
    const savedDoorState = sessionStorage.getItem('stage2DoorOpen');
    if (savedDoorState === 'true') {
      setCheckIsPlaceAnswer(true);
    }
  }, []);

  useEffect(() => {
    if (user?.stages[1]) {
      const savedDoorState = user.stages[1].cleared;
      if (savedDoorState === true) {
        setIsStage3Open(true);
        setCheckIsPlaceAnswer(true);
        setIsHandleBoxOpen(true);
        setIsBoxOpen(true);
        setDoorOpen(true);
      }
    }
  }, []);

  const goNextStage = () => {
    setDoorOpen(true);
    stageClear(2);
    navigate('/Stage3');
  };

  useEffect(() => {
    const savedStage2 = JSON.parse(sessionStorage.getItem('stage2')) || [];

    if (savedStage2.some((item) => item.placeAnswerCorrect)) {
      setCheckIsPlaceAnswer(true);
    }
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('stage2');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (items.some((item) => item.itemName === 'map')) {
      setIsMapFind(true);
    }
    if (items.some((item) => item.itemName === 'timeLocationHint')) {
      setIsBoxOpen(true);
      setIsTimeLocationHintFind(true);
    }
  }, [items]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenBook = () => {
    setIsBookOpen(true);
  };

  const closeBook = () => {
    setIsBookOpen(false);
  };

  const handlePlaceAnswer = (e) => {
    setPlaceAnswer(e.target.value);
  };

  const handleCheckPlaceAnswer = () => {
    const newAnswerStatus = { placeAnswerCorrect: placeAnswer === '포항시' };

    if (placeAnswer === '포항시') {
      setCheckIsPlaceAnswer(true);
    }
    const savedStage2 = JSON.parse(sessionStorage.getItem('stage2')) || [];
    savedStage2.push(newAnswerStatus);
    sessionStorage.setItem('stage2', JSON.stringify(savedStage2));
  };

  const handleBoxOpen = () => {
    setIsHandleBoxOpen(true);
  };

  const handleBoxClose = () => {
    setIsHandleBoxOpen(false);
  };

  const checkNumbers = () => {
    const { number1, number2, number3 } = scoreValues;
    if (number1 === 1 && number2 === 3 && number3 === 6) {
      setDoorOpen(true);
    }
  };

  const handleDropOnBox = (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');

    console.log('드래그된 아이템:', draggedItem);

    if (draggedItem === 'taegeukKey') {
      setIsBoxOpen(true);
      handleDeleteItem(5);
    }
  };

  return (
    <div className={styles.Stage2}>
      <div className={styles.BackGround} />
      <div className={styles.Stage2Floor} />
      <Inventory />
      <ToolBar isStage2Open={isStage2Open} isStage3Open={isStage3Open} />
      <img className={styles.Lamp} src={Lamp} />
      <img className={styles.BookShelf} src={BookShelf} alt="bookshelf" />
      <button className={styles.ContainMapBook} onClick={handleOpenBook} />

      {doorOpen ? (
        <div>
          <button className={styles.DoorOpen} onClick={goNextStage}>
            <img src={DoorOpen} alt="dooropen" />
          </button>
        </div>
      ) : (
        <div>
          <button className={styles.Door} onClick={handleOpenModal}>
            <img src={Door} alt="door" />
          </button>
        </div>
      )}

      {isBoxOpen ? (
        <div>
          {isHandleBoxOpen ? (
            <div>
              <img className={styles.BoxOpen} src={BoxOpen} alt="BoxOpen" />
              <button className={styles.BoxOpenButton} onClick={handleBoxClose} />
              {!isTimeLocationHintFind ? (
                <div>
                  <button
                    className={styles.CodeNote}
                    onClick={() => {
                      handleItemClick(6);
                      setIsTimeLocationHintFind(true);
                    }}
                  >
                    <img src={timeLocationHint} alt="timeLocationHint" />
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <img className={styles.Box} src={BoxOpenAfter} alt="BoxClose" />
              <button className={styles.BoxButton} onClick={handleBoxOpen} />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.Box}>
          <div className={styles.BoxButton} onDragOver={(e) => e.preventDefault()} onDrop={handleDropOnBox}></div>
          <img src={BoxClose} alt="box" />
        </div>
      )}

      <div className={styles.Stage2Modal}>
        {checkPlaceAnswer ? (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={checkNumbers} size="medium">
            <h1>임무 수행 시간을 맞추시오</h1>
            <CheckNumber setScoreValues={setScoreValues} />
          </Modal>
        ) : (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleCheckPlaceAnswer} size="small">
            <h1>임무 수행 장소를 맞추시오</h1>
            <input className={styles.PlaceAnswer} placeholder="oo시" onChange={handlePlaceAnswer} />
          </Modal>
        )}
        {isBookOpen && <Book closeBook={closeBook} setIsMapFind={setIsMapFind} isMapFind={isMapFind} />}
      </div>
      <button
        className={`${items.some((item) => item.itemName === 'dokdoPuzzle2') ? '' : styles.dokdoPuzzle2}`}
        onClick={() => {
          handleItemClick(2);
          console.log('성공');
        }}
      >
        <img src={dokdoPuzzle2} alt="dokdoPuzzle4" />
      </button>
    </div>
  );
}

export default Stage2Page;
