import styles from './Stage3Page.module.css';
import ToolBar from '../components/ToolBar.js';
import Inventory from '../components/Inventory.js';
import NumberInput from '../components/NumberInput.js';
import { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';

import Stage3wall from '../assets/Stage3wall.png';
import KoreaFlag from '../assets/KoreaFlag.png';
import GunHintImage from '../assets/GunHintImage.png'; 
import DoorClose from '../Dokdo_Private/stage1/Stage1DoorClose.png';
import DoorOpen from '../Dokdo_Private/stage1/Stage1DoorOpen.png';
import NoteImage from'../Dokdo_Private/stage3/noteImage.png';
import Modal from '../components/Modal';

import People1 from '../assets/친일파(1).png';
import People2 from '../assets/친일파(2).png';
import People3 from '../assets/친일파(3).png';
import People4 from '../assets/친일파(4).png';
import People5 from '../assets/친일파(5).png';
import People6 from '../assets/친일파(6).png';

const Stage3PeopleImage = [
  { id: 1, src: People1, name: '친일파1' },
  { id: 2, src: People2, name: '친일파2' },
  { id: 3, src: People3, name: '친일파3' },
  { id: 4, src: People4, name: '친일파4' },
  { id: 5, src: People5, name: '친일파5' },
  { id: 6, src: People6, name: '친일파6' }
];

const CorrectAnswer = [1, 2, 3];

function Stage3Page() {
  const isStage1DoorOpen = true;
  const isStage2DoorOpen = true;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [resultMessage, setResultMessage] = useState('');
  const [addKoreaFlagImage, setAddKoreaFlagImage] = useState(null);
  const [noteImage, setNoteImage] = useState(null);
  const [gunhintImage, setGunHintImage] = useState(null);
  const [isNumberInputModalOpen, setIsNumberInputModalOpen] = useState(false);

  const { addItem, items } = useInventory(); /* Context에서 items도 가져옴 */

  const handleOpenModal = () => {
    if (isAnswered) return; 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage([]);
  };

  const handleImageClick = (image) => {
    if (selectedImage.includes(image)) {
      setSelectedImage(selectedImage.filter(img => img !== image));
    } else if (selectedImage.length < 3) {
      setSelectedImage([...selectedImage, image]);
    }
  };

  const handleCheckAnswer = () => {
    const selectedIds = selectedImage.map(img => img.id);
    const isCorrect = JSON.stringify(selectedIds.slice().sort()) === JSON.stringify(CorrectAnswer.slice().sort());
  
    if (isCorrect) {
      setResultMessage('정답입니다!');
      setIsAnswered(true);
      setAddKoreaFlagImage(KoreaFlag);
      setIsModalOpen(false);
      setTimeout(() => setResultMessage(''), 1000);
    } else {
      setResultMessage('오답입니다. 다시 시도해주세요.');
      setIsModalOpen(false);
      setTimeout(() => setResultMessage(''), 1000);
    }
  };

  const handleAddKoreaFlagImageClick  = () => {
    setNoteImage(NoteImage);
  };

  const handleNoteImageClick = () => {
    setGunHintImage(GunHintImage); /* 무기힌트 이미지를 나타내고 3초 후에 처리 */
  };

  useEffect(() => {
    if (gunhintImage) {
      const timer = setTimeout(() => {
        setGunHintImage(null); /* 무기힌트 이미지를 제거하여 사라지게 설정 */
        if (!items.includes('GunHint')) { /* 인벤토리에 GunHint가 없을 때만 추가 */
          addItem('GunHint'); /* 인벤토리에 아이템 추가 */
        }
        setIsNumberInputModalOpen(true); /* 모달 열기 */
      }, 3000);

      return () => clearTimeout(timer); /* 타이머 정리 */
    }
  }, [gunhintImage, items, addItem]);

  return (
    <div className={styles.Stage3Page}>
      <div className={styles.Stage3Bg}/>
      <ToolBar isStage1Open={isStage1DoorOpen} />
      <ToolBar isStage2Open={isStage2DoorOpen} />
      <Inventory />
      <div className={styles.Stage3Floor} />

      <img 
        className={styles.DoorClose}
        src={DoorClose} alt="닫힌 문" />

      <img 
        className={styles.Stage3wall} 
        src={Stage3wall} 
        alt="스테이지3벽"
        onClick={handleOpenModal} />

      <div className={styles.Stage3Modal}>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleCheckAnswer}
          size="large"
        >
          <h3 className= {styles.ModalMent}>친일파 3명을 골라주세요.</h3>
          <div className={styles.ImageGrid}>
            <div className={styles.CenterContainer}>
              {Stage3PeopleImage.map((peopleImage) => (
                <img
                  key={peopleImage.id}
                  src={peopleImage.src}
                  alt={peopleImage.name}
                  className={`${styles.ImageItem} ${selectedImage.includes(peopleImage) ? styles.Selected : ''}`}
                  onClick={() => handleImageClick(peopleImage)}
                />
              ))}
            </div>
          </div>
        </Modal>
      </div>
      {resultMessage && (
        <div className={styles.ResultBanner}>
          <p>{resultMessage}</p>
        </div>
      )}

      {addKoreaFlagImage && (
        <div className={styles.KoreaFlag}>
          <img 
          src={KoreaFlag} 
          alt="KoreaFlag"
          className={styles.KoreaFlag}
          onClick={handleAddKoreaFlagImageClick} />
        </div>
      )}

      {noteImage && (
          <img 
            src={noteImage} 
            alt="쪽지" 
            className={styles.NoteImage} 
            onClick={handleNoteImageClick}
          />
      )}

      {gunhintImage && (
          <img 
            src={GunHintImage} 
            alt="무기힌트" 
            className={styles.GunHintImage} 
          />
      )}

      <Modal
        isOpen={isNumberInputModalOpen}
        onClose={() => {}}
        size="medium"
      >
        <NumberInput />
      </Modal>
    </div>
  );
}

export default Stage3Page;
