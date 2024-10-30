import styles from './Stage3Page.module.css';
import ToolBar from '../components/ToolBar.js';
import Inventory from '../components/Inventory.js';
import CheckNumber from '../components/CheckNumber.js';
import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

import Stage3wall from '../assets/Stage3wall.png';
import KoreaFlag from '../assets/KoreaFlag.png';
import GunHintImage from '../assets/GunHintImage.png';
import DoorClose from 'Dokdo_Private/stage1/Stage1DoorClose.png';
import DoorOpen from 'Dokdo_Private/stage1/Stage1DoorOpen.png';
import NoteImage from 'Dokdo_Private/stage3/noteImage.png';
import Modal from '../components/Modal.js';

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
  { id: 6, src: People6, name: '친일파6' },
];

const CorrectAnswer = [1, 2, 3];

function Stage3Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  /* const [isAnswered, setIsAnswered] = useState(false); */
  const [selectedImage, setSelectedImage] = useState([]);
  const [resultMessage, setResultMessage] = useState('');
  const [addKoreaFlagImage, setAddKoreaFlagImage] = useState(null);
  const [noteImage, setNoteImage] = useState(null);
  const [gunhintImage, setGunHintImage] = useState(null);
  const [isFindSpyModalOpen, setIsFindSpyModalOpen] = useState(false); /* 친일파 찾기 모달 상태 */
  const [isNumberGuessModalOpen, setIsNumberGuessModalOpen] = useState(false); /* 숫자 맞추기 모달 상태 */
  const [gunHintVisible, setGunHintVisible] = useState(false); /* 무기 힌트가 보이는 상태 */
  const [isDoorOpen, setIsDoorOpen] = useState(false); /* 문이 열렸는지 알아봄 */
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); /* 자물쇠 정답을 맞춘 상태 */
  const { items, addItem } = useInventory(); /* Context에서 items도 가져옴 */

  const [scoreValues, setScoreValues] = useState({
    number1: 0,
    number2: 0,
    number3: 0,
  }); /* CheckNumber 숫자 받아오기 */

  /* 아이템을 클릭했을 때 인벤토리에 추가하는 함수 */
  const handleItemClick = (itemName) => {
    addItem(itemName);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage([]);
  };

  /* 정답, 오답 3개로 제한 */
  const handleImageClick = (image) => {
    if (selectedImage.includes(image)) {
      /* 선택된 이미지를 다시 클릭하면 선택 해제 */
      setSelectedImage(selectedImage.filter((img) => img !== image));
    } else if (selectedImage.length < 3) {
      /* 최대 3개까지만 선택할 수 있도록 제한 (오답도 포함) */
      setSelectedImage([...selectedImage, image]);
    }
  };

  /* 친일파 찾기 모달 열기 */
  const openFindSpyModal = () => {
    if (!isAnswerCorrect) {
      /* 정답을 맞추지 않은 경우에만 열림 */
      setIsFindSpyModalOpen(true);
    }
  };

  /* 친일파 찾기 정답 확인 */
  const handleCheckAnswer = () => {
    const selectedIds = selectedImage.map((img) => img.id);
    const isCorrect = JSON.stringify(selectedIds.slice().sort()) === JSON.stringify(CorrectAnswer.slice().sort());

    if (isCorrect) {
      setResultMessage('정답입니다!');
      setIsAnswerCorrect(true); /* 정답을 맞춘 상태 업데이트 */
      setAddKoreaFlagImage(KoreaFlag); /* 정답 시 태극기 표시 */
      setIsFindSpyModalOpen(false); /* 모달 닫기 */
      setSelectedImage([]);
      setTimeout(() => setResultMessage(''), 1000);
    } else {
      setResultMessage('오답입니다. 다시 시도해주세요.');
      setTimeout(() => setResultMessage(''), 1000);
      setIsFindSpyModalOpen(false); /* 오답일 경우 모달 닫기 */
    }
    setSelectedImage([]); /* 선택된 이미지 초기화 */
  };

  const handleAddKoreaFlagImageClick = () => {
    setNoteImage(NoteImage);
  };

  /* 무기 힌트 이미지 클릭 */
  const handleNoteImageClick = () => {
    /* 숫자 맞추기 모달이 이미 정답으로 닫힌 상태일 경우 다시 열리지 않음 */
    if (isDoorOpen) return;

    // /* 오답일 경우 힌트 이미지 없이 숫자 맞추기 모달 바로 열기 */
    // if (!isDoorOpen) {
    //   setIsNumberGuessModalOpen(true);
    //   return;
    // }

    /* 정답도 오답도 아닌 경우 힌트 이미지를 3초 동안 표시 후 모달 열기 */
    setGunHintVisible(true); /* 무기 힌트 이미지를 표시 */
    setTimeout(() => {
      setGunHintVisible(false); /* 3초 후 무기 힌트 이미지를 숨김 */
      if (!items.includes('GunHint')) {
        addItem('GunHintImage'); /* 인벤토리에 무기 힌트 추가 */
      }
      setIsNumberGuessModalOpen(true); /* 숫자 맞추기 모달 열기 */
    }, 3000);
  };

  /* 숫자 확인 함수 */
  const checkNumbers = () => {
    const { number1, number2, number3 } = scoreValues;
    if (number1 === 2 && number2 === 8 && number3 === 6) {
      alert('정답입니다!');
      setIsDoorOpen(true); /* 정답 시 문이 열린 상태로 설정 */
      setIsNumberGuessModalOpen(false); /* 숫자 맞추기 모달 닫기 */
    } else {
      alert('오답입니다. 다시 시도하세요.');
      setScoreValues({ number1: 0, number2: 0, number3: 0 }); /* 오답일 경우 입력 필드 초기화 */
    }
  };

  return (
    <div className={styles.Stage3Page}>
      <div className={styles.Stage3Bg} />
      <ToolBar isStage3Open={true} isStage2Open={true} />
      <Inventory />
      <div className={styles.Stage3Floor} />

      {/* 문 이미지 - 정답 시 열린 문으로 변경 */}
      {isDoorOpen ? (
        <img className={`${styles.DoorOpen} ${styles.DoorOpen}`} src={DoorOpen} alt="열린 문" />
      ) : (
        <img className={`${styles.DoorClose} ${styles.DoorClose}`} src={DoorClose} alt="닫힌 문" />
      )}

      <img className={styles.Stage3wall} src={Stage3wall} alt="스테이지3벽" onClick={openFindSpyModal} />

      <img
        className={`${styles.Stage3Gunhint} ${styles.Stage3Gunhint} ${styles.Stage3Gunhint} ${
          items.includes('Stage3Gunhint') ? styles.hidden : ''
        }`}
        src={GunHintImage}
        onClick={() => handleItemClick('Stage3Gunhint')}
      />

      {/* <img
            className={`${styles.Stage1Drawer} ${styles.Stage1DrawerOpen} ${styles.Stage1Puzzle} ${
              items.includes('dokdoPuzzle1') ? styles.hidden : ''
            }`}
            src={Clover}
            onClick={() => handleItemClick('dokdoPuzzle1')}
          /> */}

      {/* 친일파 찾기 모달 */}
      <Modal
        isOpen={isFindSpyModalOpen}
        onClose={() => setIsFindSpyModalOpen(false)}
        onSubmit={handleCheckAnswer}
        size="large"
      >
        <h3 className={styles.ModalMent}>친일파 3명을 골라주세요.</h3>
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

      {/* KoreaFlag 이미지 - 친일파 찾기 모달 이후 표시 */}
      {addKoreaFlagImage && (
        <div className={styles.KoreaFlag}>
          <img src={KoreaFlag} alt="KoreaFlag" className={styles.KoreaFlag} onClick={handleAddKoreaFlagImageClick} />
        </div>
      )}

      {/* noteImage - KoreaFlag 클릭 후 표시 */}
      {noteImage && <img src={noteImage} alt="쪽지" className={styles.NoteImage} onClick={handleNoteImageClick} />}

      {/* 무기 힌트 이미지 */}
      {gunHintVisible && <img src={GunHintImage} alt="무기힌트" className={styles.GunHintImage} />}

      {/* 숫자 맞추기 모달 - 무기 힌트 이미지가 사라진 후 열림 */}
      <Modal
        isOpen={isNumberGuessModalOpen}
        onClose={() => setIsNumberGuessModalOpen(false)}
        onSubmit={checkNumbers}
        size="medium"
      >
        <h1 className={styles.NumberGuessModalMent}>자물쇠를 푸시오</h1>
        <CheckNumber setScoreValues={setScoreValues} />
      </Modal>

      {/* 결과 메시지 */}
      {resultMessage && (
        <div className={styles.ResultBanner}>
          <p>{resultMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Stage3Page;
