import styles from './Stage2Page.module.css';
import ToolBar from '../components/ToolBar.js';
import Inventory from '../components/Inventory.js';
import Modal from '../components/Modal.js';
import Book from '../components/Book.js';
import CheckNumber from '../components/CheckNumber.js';
import { useState } from 'react';

import BoxOpen from '../Dokdo_Private/stage2/OpenBox.png';
import BoxClose from '../Dokdo_Private/stage2/Box.png';
import Door from '../Dokdo_Private/stage2/Door.png';
import BookShelf from '../Dokdo_Private/stage2/BookShelf.png';
import ContainMapBook from '../Dokdo_Private/stage2/ContainMapBook.png';

function Stage2Page() {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [isStage2Open, setIsStage2Open] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [checkPlaceAnswer, setCheckIsPlaceAnswer] = useState(false);
  const [placeAnswer, setPlaceAnswer] = useState('');
  const [isTaegeukKeyDropped, setIsTaegeukKeyDropped] = useState(false);
  const [isMapFind, setIsMapFind] = useState(false);
  const [scoreValues, setScoreValues] = useState({
    number1: 0,
    number2: 0,
    number3: 0,
  }); /* HandleScoreChange 숫자 받아오기 */

  const handleOpenBox = () => {
    setIsBoxOpen(true);
  };

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
    if (placeAnswer === '포항시') {
      setCheckIsPlaceAnswer(true);
    } else {
      alert('오답입니다. 다시 시도하세요');
    }
  };

  const checkNumbers = () => {
    /* 숫자 확인 함수(정답 확인) */
    const { number1, number2, number3 } = scoreValues;
    if (number1 === 1 && number2 === 3 && number3 === 5) {
      alert('정답입니다!');
    } else {
      alert('오답입니다. 다시 시도하세요.');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const draggedItem = event.dataTransfer.getData('text/plain');
    if (draggedItem === 'TaegeukKey') {
      setIsTaegeukKeyDropped(true);
      handleOpenBox();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.Stage2}>
      <div className={styles.BackGround} />
      <div className={styles.Stage2Floor} />
      <Inventory />
      <ToolBar isStage2Open={isStage2Open} />
      <img className={styles.BookShelf} src={BookShelf} alt="bookshelf" />
      <button className={styles.ContainMapBook} onClick={handleOpenBook}>
        <img src={ContainMapBook} />
      </button>
      <button className={styles.Door} onClick={handleOpenModal}>
        <img src={Door} alt="door" />
      </button>
      {isBoxOpen || isTaegeukKeyDropped ? (
        <img className={styles.BoxOpen} src={BoxOpen} />
      ) : (
        <div className={styles.Box} onDragOver={handleDragOver} onDrop={handleDrop}>
          <img src={BoxClose} alt="box" />
        </div>
      )}

      <div className={styles.Stage2Modal}>
        {checkPlaceAnswer ? (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={checkNumbers} size="medium">
            <h1>임무 수행 시간을 맞추시오</h1>
            <CheckNumber setScoreValues={setScoreValues} /> {/* 숫자 맞출수 있는 컴포넌트 불러오기 */}
          </Modal>
        ) : (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleCheckPlaceAnswer} size="small">
            <h1>임무 수행 장소를 맞추시오</h1>
            <input className={styles.PlaceAnswer} placeholder="oo시" onChange={handlePlaceAnswer} />
          </Modal>
        )}
        {isBookOpen && <Book closeBook={closeBook} setIsMapFind={setIsMapFind} isMapFind={isMapFind} />}
      </div>
    </div>
  );
}

export default Stage2Page;
