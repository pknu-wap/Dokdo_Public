import styles from './Stage2Page.module.css';
import ToolBar from '../components/ToolBar.js';
import { useState } from 'react';
import Modal from '../components/Modal.js';
import BoxOpen from '../assets/Stage2BoxOpen.png';
import BoxClose from '../assets/Stage2Box.png';
import Door from '../assets/Stage2Door.png';
import BookShelf from '../assets/BookShelf.jpg';
import Book from '../components/Book.js';
import HandleScoreChange from '../components/HandleScoreChange.js';

function Stage2Page() {
  const [changeImage, setChangeImage] = useState(BoxClose);
  const [isStage2Open, setIsStage2Open] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [checkPlaceAnswer, setCheckIsPlaceAnswer] = useState(false);
  const [placeAnswer, setPlaceAnswer] = useState('');

  const handleChangeImage = () => {
    setChangeImage(BoxOpen);
    setTimeout(() => {
      setChangeImage(BoxClose);
      console.log('지연완료');
    }, 1000);
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
    console.log('handleCheckPlaceAnswer 호출됨');
    if (placeAnswer === '포항시') {
      setCheckIsPlaceAnswer(true);
    } else {
      alert('오답입니다. 다시 시도하세요');
    }
  };

  const checkNumbers = ({ number1, number2, number3 }) => {
    if (number1 === 1 && number2 === 3 && number3 === 5) {
      alert('정답입니다!');
    } else {
      alert('오답입니다. 다시 시도하세요.');
    }
  };

  return (
    <div className={styles.Stage2}>
      <div className={styles.BackGround} />
      <div className={styles.Stage2Floor} />
      <ToolBar isStage2Open={isStage2Open} />
      <button className={styles.Door} onClick={handleOpenModal}>
        <img src={Door} alt="door" />
      </button>
      <button className={styles.Box} onClick={handleChangeImage}>
        <img src={changeImage} alt="box" />
      </button>
      <img className={styles.BookShelf} src={BookShelf} alt="bookshelf" />
      <button className={styles.BookButton} onClick={handleOpenBook}></button>
      <div className={styles.Stage2Modal}>
        <button type="button" onClick={handleCheckPlaceAnswer}>
          정답확인
        </button>
        {checkPlaceAnswer === true ? (
          <div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="medium">
              <h2>시간을 맞추세요</h2>
              <HandleScoreChange onSubmit={checkNumbers} />
            </Modal>
          </div>
        ) : (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleCheckPlaceAnswer} size="medium">
            <h2>장소를 맞추세요</h2>
            장소:
            <input className={styles.PlaceAnswer} placeholder="oo시" onChange={handlePlaceAnswer} />
          </Modal>
        )}

        {isBookOpen && <Book closeBook={closeBook} />}
      </div>
    </div>
  );
}

export default Stage2Page;