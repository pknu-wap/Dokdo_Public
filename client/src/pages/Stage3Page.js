import styles from './Stage3Page.module.css';
import ToolBar from '../components/ToolBar.js';
import Inventory from '../components/Inventory.js';
import CheckNumber from '../components/CheckNumber.js';
import Modal from '../components/Modal.js';
import { useState, useEffect } from 'react';
import { useInventory2 } from '../context/InventoryContext2';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

import Stage3wall from 'assets/stage3/Stage3wall.png';
import KoreaFlag from 'assets/stage3/KoreaFlag.png';
import GunHintImage from 'assets/stage3/GunHintImage.png';
import DoorClose from 'assets/stage3/Stage3DoorClose.png';
import DoorOpen from 'assets/stage3/Stage3DoorOpen.png';
import NoteImage from 'assets/stage3/noteImage.png';
import SpyHintImage from 'assets/stage3/SpyHintImage.png';
import dokdoPuzzle3 from '../assets/clover3.png';

import People1 from 'assets/stage3/친일파(1).png';
import People2 from 'assets/stage3/친일파(2).png';
import People3 from 'assets/stage3/친일파(3).png';
import People4 from 'assets/stage3/친일파(4).png';
import People5 from 'assets/stage3/친일파(5).png';
import People6 from 'assets/stage3/친일파(6).png';
import People7 from 'assets/stage3/친일파(7).png';
import People8 from 'assets/stage3/친일파(8).png';

const Stage3PeopleImage = [
  { id: 1, src: People1, name: '친일파1' },
  { id: 2, src: People2, name: '친일파2' },
  { id: 3, src: People3, name: '친일파3' },
  { id: 4, src: People4, name: '친일파4' },
  { id: 5, src: People5, name: '친일파5' },
  { id: 6, src: People6, name: '친일파6' },
  { id: 7, src: People7, name: '친일파7' },
  { id: 8, src: People8, name: '친일파8' },
];

const CorrectAnswer = [1, 6, 8];

function Stage3Page() {
  const [selectedImage, setSelectedImage] = useState([]);
  const [resultMessage, setResultMessage] = useState('');
  const [addKoreaFlagImage, setAddKoreaFlagImage] = useState(null);
  const [noteImage, setNoteImage] = useState(null);
  const [isFindSpyModalOpen, setIsFindSpyModalOpen] = useState(false); /* 친일파 찾기 모달 상태 */
  const [isNumberGuessModalOpen, setIsNumberGuessModalOpen] = useState(false); /* 숫자 맞추기 모달 상태 */
  const [gunHintVisible, setGunHintVisible] = useState(false); /* 무기 힌트가 보이는 상태 */
  const [isDoorOpen, setIsDoorOpen] = useState(false); /* 문이 열렸는지 알아봄 */
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); /* 자물쇠 정답을 맞춘 상태 */
  const [isGunHintCollected, setIsGunHintCollected] = useState(false); /* GunHintImage 수집 여부 상태 */
  const [spyHintImagesVisible, setSpyHintImagesVisible] = useState(false); /* 친일파 힌트 이미지 상태 */
  const [isDokdoPuzzleVisible, setIsDokdoPuzzleVisible] = useState(true);

  const { addItem } = useInventory2(); /* Context에서 items도 가져옴 */
  const [items, setItems] = useState([]);
  const { user, fetchUser, stageClear } = useUser();
  const navigate = useNavigate();

  const [scoreValues, setScoreValues] = useState({
    number1: 0,
    number2: 0,
    number3: 0,
  }); /* CheckNumber 숫자 받아오기 */

  useEffect(() => {
    fetchUser();
  }, []);

  /* 아이템 추가 함수 */
  let isAddingItem = false;

  const handleItemClick = async (itemId) => {
    if (isAddingItem) return; /* 이미 추가 요청 중이면 아무 작업도 하지 않음 */

    if (!user?.sessionId) {
      console.log('Session ID가 없습니다.');
      return;
    }

    if (items.some((item) => item.id === itemId)) {
      console.log('이미 추가된 아이템입니다.');
      return;
    }

    try {
      isAddingItem = true; /* 추가 요청 시작 */
      await addItem({ sessionId: user.sessionId, itemId });
      setItems((prevItems) => [...prevItems, { id: itemId }]); /*즉시 로컬 업데이트*/

      const updatedUser = await fetchUser();
      if (updatedUser?.inventory) {
        setItems(updatedUser.inventory);
      }
      console.log('업데이트된 인벤토리:', updatedUser.inventory);
    } catch (error) {
      console.error('아이템 추가 중 오류 발생', error);
    } finally {
      isAddingItem = false; /* 추가 요청 종료 */
    }
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
    if (!isAnswerCorrect && !isDoorOpen) {
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

      /* Spy 힌트 이미지를 표시하고 2초 후 사라짐과 동시에 인벤토리에 추가 */
      let isSpyHintHandled = false;

      setTimeout(() => {
        setSpyHintImagesVisible(false);

        if (!isSpyHintHandled) {
          handleItemClick(9);
          isSpyHintHandled = true; // 중복 호출 방지
        }
      }, 1000);
    } else {
      setResultMessage('오답입니다. 다시 시도해주세요.');
      setTimeout(() => setResultMessage(''), 1000);
      setIsFindSpyModalOpen(false); /* 오답일 경우 모달 닫기 */
    }
    setSelectedImage([]); /* 선택된 이미지 초기화 */
  };

  const handleAddKoreaFlagImageClick = () => {
    if (!isGunHintCollected) {
      /* GunHintImage가 수집되지 않은 경우에만 동작 */
      setNoteImage(NoteImage);
    }
  };

  /* 무기 힌트 이미지 클릭 */
  const handleNoteImageClick = () => {
    /* 정답도 오답도 아닌 경우 힌트 이미지를 3초 동안 표시 */
    setGunHintVisible(true); /* 무기 힌트 이미지를 표시 */
    setNoteImage(null);

    setTimeout(() => {
      setGunHintVisible(false); /* 3초 후 무기 힌트 이미지를 숨김 */
      if (!items.includes('GunHint')) {
        handleItemClick(8);
        setIsGunHintCollected(true); /* GunHintImage 수집 상태 true */
      }
    }, 1000);
  };

  /* 숫자 확인 함수 */
  const checkNumbers = () => {
    const { number1, number2, number3 } = scoreValues;
    if (number1 === 3 && number2 === 0 && number3 === 8) {
      setIsDoorOpen(true); /* 정답 시 문이 열린 상태로 설정 */
      setResultMessage('정답입니다!');
      setTimeout(() => setResultMessage(''), 1000);
      sessionStorage.setItem('stage3DoorOpen', 'true'); /* 문이 열린 상태를 저장 */
      setIsNumberGuessModalOpen(false); /* 숫자 맞추기 모달 닫기 */
      stageClear(3);
    } else {
      setResultMessage('오답입니다. 다시 시도해주세요.');
      setTimeout(() => setResultMessage(''), 1000);
      setScoreValues({ number1: 0, number2: 0, number3: 0 }); /* 오답일 경우 입력 필드 초기화 */
    }
  };

  const handleDoorClick = () => {
    if (isDoorOpen) {
      navigate('/Stage4Room1');
    } else if (!isDoorOpen && isGunHintCollected) {
      setIsNumberGuessModalOpen(true);
    }
  };

  /* 새로고침 시 문이 열린 상태 유지 */
  useEffect(() => {
    const savedDoorState = sessionStorage.getItem('stage3DoorOpen');
    if (savedDoorState === 'true') {
      setIsDoorOpen(true);
    }
  }, []);

  const handleDokdoPuzzleClick = () => {
    handleItemClick(3);
    setIsDokdoPuzzleVisible(false);
    console.log('독도 퍼즐 조각이 인벤토리에 추가됨');
  };

  return (
    <div className={styles.Stage3Page}>
      <div className={styles.Stage3Bg} />
      <ToolBar isStage3Open={true} isStage2Open={true} />
      <Inventory />
      <div className={styles.Stage3Floor} />

      {/* 문 이미지 - 정답 시 열린 문으로 변경 */}
      {isDoorOpen ? (
        <img
          className={`${styles.DoorOpen} ${styles.DoorOpen}`}
          src={DoorOpen}
          alt="열린 문"
          onClick={handleDoorClick}
        />
      ) : (
        <img
          className={`${styles.DoorClose} ${styles.DoorClose}`}
          src={DoorClose}
          alt="닫힌 문"
          onClick={handleDoorClick}
        />
      )}

      <img className={styles.Stage3wall} src={Stage3wall} alt="스테이지3벽" onClick={openFindSpyModal} />

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

      {/* 독도 퍼즐 조각 이미지 */}
      {isDokdoPuzzleVisible && (
        <img
          className={styles.DokdoPuzzle3}
          src={dokdoPuzzle3}
          alt="독도 퍼즐 조각3"
          onClick={handleDokdoPuzzleClick}
        />
      )}

      {/* KoreaFlag 이미지 - 친일파 찾기 모달 이후 표시 */}
      {addKoreaFlagImage && (
        <div>
          <img src={KoreaFlag} alt="KoreaFlag" className={styles.KoreaFlag} onClick={handleAddKoreaFlagImageClick} />
        </div>
      )}

      {/* noteImage - KoreaFlag 클릭 후 표시 */}
      {noteImage && <img src={noteImage} alt="쪽지" className={styles.NoteImage} onClick={handleNoteImageClick} />}

      {/* 무기 힌트 이미지 */}
      {gunHintVisible && <img src={GunHintImage} alt="무기힌트" className={styles.GunHintImage} />}

      {/* 친일파 힌트 이미지 - 정답 후 2초 동안 표시 */}
      {spyHintImagesVisible && (
        <div className={styles.SpyHintImage}>
          <img src={SpyHintImage} alt="Spy Hint" />
        </div>
      )}

      {/* 숫자 맞추기 모달 - 닫힌 문 클릭시 열림 */}
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
