import styles from './Stage2Page.module.css';
import ToolBar from '../components/ToolBar.js';
import { useState } from 'react';
import Modal from '../components/Modal.js';
import BoxOpen from '../assets/Stage2BoxOpen.png';
import BoxClose from '../assets/Stage2Box.png';
import Door from '../assets/Stage2Door.png';
import BookShelf from '../assets/BookShelf.jpg';
import Book from '../components/Book.js';

function Stage2Page() {
  const [changeImage, setChangeImage] = useState(BoxClose);
  const [isStage2Open, setIsStage2Open] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
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

  return (
    <div className={styles.Stage2}>
      <ToolBar isStage2Open={isStage2Open} />
      <button
        className={styles.Door}
        onClick={() => {
          handleOpenModal();
        }}
      >
        <img src={Door} />
      </button>
      <button
        className={styles.Box}
        onClick={() => {
          handleChangeImage();
        }}
      >
        <img src={changeImage} alt="loading" />
      </button>
      <img className={styles.BookShelf} src={BookShelf} />
      <button
        className={styles.BookButton}
        onClick={() => {
          handleOpenBook();
        }}
      ></button>
      <div className={styles.Stage2Modal}>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="large">
          <h2>시간을 맞추세요</h2>
        </Modal>
        {isBookOpen === true ? <Book /> : null}
      </div>
    </div>
  );
}

export default Stage2Page;
