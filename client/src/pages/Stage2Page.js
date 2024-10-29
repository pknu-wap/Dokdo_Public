import styles from './Stage2Page.module.css';
import ToolBar from '../components/ToolBar.js';
import Inventory from '../components/Inventory.js';
import Modal from '../components/Modal.js';
import Book from '../components/Book.js';
import CheckNumber from '../components/CheckNumber.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext.js';

import BoxOpen from '../Dokdo_Private/stage2/OpenBox.png';
import BoxClose from '../Dokdo_Private/stage2/Box.png';
import Door from '../Dokdo_Private/stage2/Door.png';
import BookShelf from '../Dokdo_Private/stage2/BookShelf.png';
import ContainMapBook from '../Dokdo_Private/stage2/ContainMapBook.png';
import Lamp from '../Dokdo_Private/stage2/Lamp.png';
import DoorOpen from '../Dokdo_Private/stage2/DoorOpen.png';
import CodeNote from '../Dokdo_Private/stage2/CodeNoteCut.png';

function Stage2Page() {
  const navigate = useNavigate();
  const { items } = useInventory();
  const { addItem } = useInventory();

  const handleItemClick = (itemName) => {
    addItem(itemName);
  };

  const [isBoxOpen, setIsBoxOpen] = useState(false); /* 드래그 되고 나서의 상태를 보고싶다면 이걸 true로 바꿔주세요 */
  const [isHandleBoxOpen, setIsHandleBoxOpen] = useState(false);
  const [isStage2Open, setIsStage2Open] = useState(true);
  const [isStage3Open, setIsStage3Open] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [checkPlaceAnswer, setCheckIsPlaceAnswer] = useState(false);
  const [placeAnswer, setPlaceAnswer] = useState('');
  const [isMapFind, setIsMapFind] = useState(false);
  const [isCodeNoteFind, setIsCodeNoteFind] = useState(false);
  const [scoreValues, setScoreValues] = useState({
    number1: 0,
    number2: 0,
    number3: 0,
  });

  const [doorOpen, setDoorOpen] = useState(false);

  useEffect(() => {
    const savedDoorState = sessionStorage.getItem('stage2Door');
    if (savedDoorState === 'true') {
      setDoorOpen(true);
    }
    const newInventoryItems = items.map((item) => ({
      id: item,
      name: item,
    }));

    if (newInventoryItems.some((item) => item.name === 'Map')) {
      setIsMapFind(true);
    }
    if (newInventoryItems.some((item) => item.name === 'CodeNote')) {
      setIsCodeNoteFind(true);
    }
  }, [items]);

  const goNextStage = () => {
    setDoorOpen(true);
    navigate('/Stage3');
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
    }
  };

  const handleBoxOpen = () => {
    setIsHandleBoxOpen(true);
  };

  const handleBoxClose = () => {
    setIsHandleBoxOpen(false);
  };

  const checkNumbers = () => {
    const { number1, number2, number3 } = scoreValues;
    if (number1 === 1 && number2 === 3 && number3 === 5) {
      sessionStorage.setItem('stage2Door', 'true');
      setDoorOpen(true);
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
              {!isCodeNoteFind ? (
                <div>
                  <button
                    className={styles.CodeNote}
                    onClick={() => {
                      handleItemClick('CodeNote');
                      setIsCodeNoteFind(true);
                    }}
                  >
                    <img src={CodeNote} alt="CodeNote" />
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <img className={styles.Box} src={BoxClose} alt="BoxClose" />
              <button className={styles.BoxButton} onClick={handleBoxOpen} />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.Box}>
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
    </div>
  );
}

export default Stage2Page;
