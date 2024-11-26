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
import GunHintImage from 'assets/stage3/GunHintImage.png';
import DoorClose from 'assets/stage3/Stage3DoorClose.png';
import DoorOpen from 'assets/stage3/Stage3DoorOpen.png';
import NoteImage from 'assets/stage3/noteImage.png';
import SpyHintImage from 'assets/stage3/SpyHintImage.png';
import dokdoPuzzle3 from '../assets/dokdoPuzzle3.png';

import People1 from 'assets/stage3/친일파(1).png';
import People2 from 'assets/stage3/친일파(2).png';
import People3 from 'assets/stage3/친일파(3).png';
import People4 from 'assets/stage3/친일파(4).png';
import People5 from 'assets/stage3/친일파(5).png';
import People6 from 'assets/stage3/친일파(6).png';
import People7 from 'assets/stage3/친일파(7).png';
import People8 from 'assets/stage3/친일파(8).png';

import KoreaFlag from 'assets/stage3/KoreaFlag.png';
import KoreaFlag2 from 'assets/stage3/KoreaFlag2.png';
import JapanFlag from 'assets/stage3/JapanFlag.png';
import JapanFlag2 from 'assets/stage3/JapanFlag2.png';
import Flag1 from 'assets/stage3/국기1.png';
import Flag2 from 'assets/stage3/국기2.png';
import Flag3 from 'assets/stage3/국기3.png';
import Flag4 from 'assets/stage3/국기4.png';
import Flag5 from 'assets/stage3/국기5.png';
import Flag6 from 'assets/stage3/국기6.png';
import Flag7 from 'assets/stage3/국기7.png';
import Flag8 from 'assets/stage3/국기8.png';
import Flag9 from 'assets/stage3/국기9.png';
import Flag10 from 'assets/stage3/국기10.png';

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
  const [isFindSpyModalOpen, setIsFindSpyModalOpen] = useState(false); /* 친일파 찾기 모달 상태 */
  const [isNumberGuessModalOpen, setIsNumberGuessModalOpen] = useState(false); /* 숫자 맞추기 모달 상태 */
  const [gunHintVisible, setGunHintVisible] = useState(false); /* 무기 힌트가 보이는 상태 */
  const [isDoorOpen, setIsDoorOpen] = useState(false); /* 문이 열렸는지 알아봄 */
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); /* 자물쇠 정답을 맞춘 상태 */
  const [isGunHintCollected, setIsGunHintCollected] = useState(false); /* GunHintImage 수집 여부 상태 */
  const [spyHintImagesVisible, setSpyHintImagesVisible] = useState(false); /* 친일파 힌트 이미지 상태 */

  const { addItem } = useInventory2(); /* Context에서 items도 가져옴 */
  const [items, setItems] = useState([]);
  const { user, fetchUser, stageClear } = useUser();
  const navigate = useNavigate();

  const [scoreValues, setScoreValues] = useState({
    number1: 0,
    number2: 0,
    number3: 0,
  }); /* CheckNumber 숫자 받아오기 */

  /* 사용자 정보 불러오기 */
  useEffect(() => {
    fetchUser();
    if (user?.inventory) {
      setItems(user.inventory);
    }
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

  const handleImageClick = (image) => {
    /* 정답, 오답 3개로 제한 */
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
      setIsFindSpyModalOpen(false); /* 모달 닫기 */
      setSelectedImage([]);
      setTimeout(() => setResultMessage(''), 1000);

      /* Spy 힌트 이미지를 표시하고 일정 시간 후 사라짐과 동시에 인벤토리에 추가 */
      setSpyHintImagesVisible(true);
      setTimeout(() => {
        setSpyHintImagesVisible(false);
        handleItemClick(9); /* Spy 힌트 아이템 추가 */
      }, 1000); /* 1초 뒤 인벤토리에 추가 */
    } else {
      setResultMessage('오답입니다. 다시 시도해주세요.');
      setTimeout(() => setResultMessage(''), 1000);
      setIsFindSpyModalOpen(false); /* 오답일 경우 모달 닫기 */
    }
    setSelectedImage([]);
};

  /* 무기 힌트 이미지 클릭 */
  const handleNoteImageClick = () => {
    if (items.some((item) => item.itemName === 'GunHint')) return;
    setGunHintVisible(true); /* GunHintImage를 표시하고 NoteImage를 숨김 */

    setTimeout(() => {
      setGunHintVisible(false);
      setIsGunHintCollected(true); /*GunHint 수집 완료 상태 설정*/
      handleItemClick(8);
    }, 1000);
  };

  /* 새로고침 시 문이 열린 상태 유지 */
  useEffect(() => {
    console.log('Stage3 cleared status:', user?.stages[2]?.cleared);
    if (user?.stages[2]?.cleared) {
      setIsDoorOpen(true);
    } else {
      setIsDoorOpen(false);
    }
  }, [user]);

  /* 숫자 확인 함수 */
  const checkNumbers = () => {
    if (isDoorOpen) return;

    const { number1, number2, number3 } = scoreValues;
    console.log('현재 입력 값:', { number1, number2, number3 });
    if (number1 === 3 && number2 === 0 && number3 === 8) {
      console.log('정답입니다. Stage Clear 호출');
      setIsDoorOpen(true); /* 정답 시 문이 열린 상태로 설정 */
      setResultMessage('정답입니다!');
      setTimeout(() => setResultMessage(''), 1000);
      setIsNumberGuessModalOpen(false); /* 숫자 맞추기 모달 닫기 */
    } else {
      setResultMessage('오답입니다. 다시 시도해주세요.');
      setTimeout(() => setResultMessage(''), 1000);
      setScoreValues({ number1: 0, number2: 0, number3: 0 }); /* 오답일 경우 입력 필드 초기화 */
    }
  };

  const handleDoorClick = () => {
    if (!isDoorOpen) {
      setIsNumberGuessModalOpen(true); /* 숫자 모달 열기 */
    } else {
      stageClear(3)
        .then(() => {
          navigate('/Stage4Room1'); /* Stage 4로 이동 */
        })
        .catch((error) => console.error('Stage 3 clear 요청 실패:', error));
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
        <img className={`${styles.DoorOpen}`} src={DoorOpen} alt="열린 문" onClick={handleDoorClick} />
      ) : (
        <img className={`${styles.DoorClose}`} src={DoorClose} alt="닫힌 문" onClick={handleDoorClick} />
      )}

      <img className={styles.Stage3wall} src={Stage3wall} alt="스테이지3벽" onClick={openFindSpyModal} />
      <div className={styles.flags}>
        <img src={JapanFlag} alt="JapanFlag" className={styles.flagTopLeft} />
        <img src={Flag1} alt="Flag1" className={styles.flagTop2} />
        <img src={KoreaFlag} alt="KoreaFlag" className={styles.flagTop3} />
        <img src={Flag2} alt="Flag2" className={styles.flagTop4} />
        <img src={Flag3} alt="Flag3" className={styles.flagTopRight} />
        <img src={Flag4} alt="Flag4" className={styles.flagLeft} />
        <img src={KoreaFlag2} alt="KoreaFlag2" className={styles.flagLeft2} />
        <img src={Flag5} alt="Flag5" className={styles.flagRight} />
        <img src={Flag6} alt="Flag6" className={styles.flagRight2} />
        <img src={Flag7} alt="Flag7" className={styles.flagBottomLeft} />
        <img src={Flag8} alt="Flag8" className={styles.flagBottom2} />
        <img src={Flag9} alt="Flag9" className={styles.flagBottom3} />
        <img src={Flag10} alt="Flag10" className={styles.flagBottom4} />
        <img src={JapanFlag2} alt="JapanFlag2" className={styles.flagBottomRight} />
      </div>

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
      <img
        className={`${styles.DokdoPuzzle3} ${
          items && items.some((item) => item.itemName === 'dokdoPuzzle3') ? styles.hidden : ''
        }`}
        src={dokdoPuzzle3}
        onClick={() => handleItemClick(3)}
      />

      {/* noteImage 이미지 */}
      {!isGunHintCollected && !items?.some((item) => item.itemName === 'gunHint') && (
        <div>
          <img src={NoteImage} alt="noteImage" className={styles.NoteImage} onClick={handleNoteImageClick} />
        </div>
      )}

      {/* 무기 힌트 이미지 */}
      {gunHintVisible /* gunHintVisible이 true이고 GunHint가 인벤토리에 없는 경우에만 렌더링 */ && (
        <img
          className={`${styles.GunHintImage} ${
            items && items.some((item) => item.itemName === 'gunHint') ? styles.hidden : ''
          }`}
          src={GunHintImage}
          alt="무기힌트"
        />
      )}

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
