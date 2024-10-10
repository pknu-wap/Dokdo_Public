import styles from './Stage3Page.module.css';
import Stage3wall from '../assets/Stage3wall.png';
import Flag1 from '../assets/국기(1).png';
import Flag2 from '../assets/국기(2).png';
import Flag3 from '../assets/국기(3).png';
import Flag4 from '../assets/국기(4).png';
import Flag5 from '../assets/국기(5).png';
import Flag6 from '../assets/국기(6).png';
import Flag7 from '../assets/국기(7).png';
import Flag8 from '../assets/국기(8).png';
import Flag9 from '../assets/국기(9).png';
import Flag10 from '../assets/국기(10).png';
import Flag11 from '../assets/국기(11).png';
import Flag12 from '../assets/국기(12).png';
import Flag13 from '../assets/국기(13).png';
import Flag14 from '../assets/국기(14).png';
import People1 from '../assets/친일파(1).png';
import People2 from '../assets/친일파(2).png';
import People3 from '../assets/친일파(3).png';
import People4 from '../assets/친일파(4).png';
import People5 from '../assets/친일파(5).png';
import People6 from '../assets/친일파(6).png';
import Modal from '../components/Modal';
import { useState } from 'react';

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
  const [selectedImage, setSelectedImage] = useState([]); /* 초기 상태에 선택된 이미지 없음 */
  const [resultMessage, setResultMessage] = useState(''); /* 정답/오답 메시지 */

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage([]); /* 모달 닫을 때 선택 초기화 */
    setResultMessage('');  /* 모달 닫을 때 메시지 초기화 */
  };

  const handleImageClick = (image) => {
    if (selectedImage.includes(image)) {
      setSelectedImage(selectedImage.filter(img => img !== image));
    } else if (selectedImage.length < 3) {
      setSelectedImage([...selectedImage, image]);
    }
  };

  /* 정답,오답 표시해주는 기능은 아직 구현 못했어요 */
  const handleCheckAnswer = () => {
    const selectedIds = selectedImage.map(img => img.id);
    console.log('Selected Images:', selectedImage);
    console.log('Selected IDs:', selectedIds);
    const isCorrect = JSON.stringify(selectedIds.slice().sort()) === JSON.stringify(CorrectAnswer.slice().sort());

    if (isCorrect) {
      setResultMessage('정답입니다!');
    } else {
      setResultMessage('오답입니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles.Stage3Page}>
      <img 
        className={styles.Stage3wall} 
        src={Stage3wall} 
        alt="스테이지3벽"
        onClick={handleOpenModal} />

      <div className="Stage3Modal">
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleCheckAnswer} /* onSubmit으로 handleCheckAnswer 전달 */
          size="large"
        >
          <h2>친일파 3명을 골라주세요.</h2>

          <div className={styles.ImageGrid}>
            <img className={styles.FlagItem} src={Flag1} alt="국기1" />
            <img className={styles.FlagItem} src={Flag2} alt="국기2" />
            <img className={styles.FlagItem} src={Flag3} alt="국기3" />
            <img className={styles.FlagItem} src={Flag4} alt="국기4" />
            <img className={styles.FlagItem} src={Flag5} alt="국기5" />
            <img className={styles.FlagItem} src={Flag6} alt="국기6" />
            <img className={styles.FlagItem} src={Flag7} alt="국기7" />
            <img className={styles.FlagItem} src={Flag8} alt="국기8" />
            <img className={styles.FlagItem} src={Flag9} alt="국기9" />
            <img className={styles.FlagItem} src={Flag10} alt="국기10" />
            <img className={styles.FlagItem} src={Flag11} alt="국기11" />
            <img className={styles.FlagItem} src={Flag12} alt="국기12" />
            <img className={styles.FlagItem} src={Flag13} alt="국기13" />
            <img className={styles.FlagItem} src={Flag14} alt="국기14" />

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

          {resultMessage && <p className={styles.ResultMessage}>{resultMessage}</p>}
        </Modal>
      </div>
    </div>
  );
}

export default Stage3Page;
