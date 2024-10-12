import { useState } from 'react';
import styles from './Stage3Page.module.css';
import Stage3wall from '../assets/Stage3wall.png';
import People1 from '../assets/친일파(1).png';
import People2 from '../assets/친일파(2).png';
import People3 from '../assets/친일파(3).png';
import People4 from '../assets/친일파(4).png';
import People5 from '../assets/친일파(5).png';
import People6 from '../assets/친일파(6).png';
import KoreaFlag from '../assets/KoreaFlag.png';
import GunHintImage from '../assets/GunHintImage.png'; 
import ToolBar from '../components/ToolBar.js';
import DoorClose from '../Dokdo_Private/stage1/Stage1DoorClose.png';
import DoorOpen from '../Dokdo_Private/stage1/Stage1DoorOpen.png';
import NoteImage from'../Dokdo_Private/stage3/noteImage.png';
import Modal from '../components/Modal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]); /* 초기 상태에 선택된 이미지 없음 */
  const [resultMessage, setResultMessage] = useState(''); /* 정답/오답 메시지 */
  const [addKoreaFlagImage, setAddKoreaFlagImage] = useState(null);
  const [noteImage, setNoteImage] = useState(null); /* 쪽지 */
  const [gunhintImage, setGunHintImage] = useState(null); /* 무기힌트 */
  const [isStage3Open, setIsStage3Open] = useState(true);

  const handleOpenModal = () => {
    if (isAnswered) return; 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage([]); /* 모달 닫을 때 선택 초기화 */
  };

  const handleImageClick = (image) => {
    if (selectedImage.includes(image)) {
      setSelectedImage(selectedImage.filter(img => img !== image));
    } else if (selectedImage.length < 3) {
      setSelectedImage([...selectedImage, image]);
    }
  };

  const handleCheckAnswer = () => {
    const selectedIds = selectedImage.map(img => img.id); /*선택된 이미지의 id를 가져옴 */
    const isCorrect = JSON.stringify(selectedIds.slice().sort()) === JSON.stringify(CorrectAnswer.slice().sort());
  
    if (isCorrect) {
      setResultMessage('정답입니다!');  /* 정답일 때 메시지 설정 */
      setIsAnswered(true); /* 정답 맞췄을 시, 상태 업데이트함 */
      setAddKoreaFlagImage(KoreaFlag); /* 정답 맞췄을 때 사진 추가 */
      setIsModalOpen(false); /* 정답 맞추면 모달 닫음 */

    setTimeout(() => {
       setResultMessage(''); 
    }, 1000); 
    } else {
      setResultMessage('오답입니다. 다시 시도해주세요.');  /* 오답일 때 메시지 설정 */
      setIsModalOpen(false); /* 오답일 때 모달 닫음 */
    }

    setTimeout(() => {
      setResultMessage('');
    }, 1000); 
  };

  const handleAddKoreaFlagImageClick  = () => {
    setNoteImage(NoteImage);
  };

  const handleNoteImageClick = () => {
    setGunHintImage(GunHintImage); 

    setNoteImage(null);

    setTimeout(() => {
      setGunHintImage(null); 
    }, 3000);
  };

  return (
    <div className={styles.Stage3Page}>
      <div className={styles.Stage3Bg}/>
      <ToolBar isStage3Open={isStage3Open} />
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
          onSubmit={handleCheckAnswer} /* onSubmit으로 handleCheckAnswer 전달 */
          size="large"
        >
          <h3 className= {styles.ModalMent}>친일파 3명을 골라주세요.</h3>

          <div className={styles.ImageGrid}>
            {/* 중앙 인물 이미지 */}
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
          alt={KoreaFlag} 
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
          src={gunhintImage} 
          alt="무기 힌트 이미지" 
          className={styles.GunHintImage} 
        />
      )}
    </div>
  );
}

export default Stage3Page;