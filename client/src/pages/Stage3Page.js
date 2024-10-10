import styles from './Stage3Page.module.css';
import Stage3wall from '../assets/stage3wall.png';

import Modal from '../components/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Stage3Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]); /* 초기 상태에 선택된 이미지 없음 */
  
    /*수정필요함*/
  const imageList = [ 
    { id: 1, src: 'path/to/image1.jpg', alt: '이미지 1' },
    { id: 2, src: 'path/to/image2.jpg', alt: '이미지 2' },
    { id: 3, src: 'path/to/image3.jpg', alt: '이미지 3' },
    { id: 4, src: 'path/to/image4.jpg', alt: '이미지 4' },
  ];
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage([]); /*모달 닫힐 때 선택된 이미지 초기화*/
  };



  /* 사진 선택, 취소 */
  const handleImageSelect = (image) => {
    if (selectedImage.some(selected => selected.id === image.id)) {
      /* 이미 선택된 이미지면 선택 해제 */
      setSelectedImage(selectedImage.filter(selected => selected.id !== image.id));
    } else if (selectedImage.length < 3) {
      /* 3장 이하만 선택 가능 */
      setSelectedImage([...selectedImage, image]);
    }
  };

  /* 정답확인 */
  const handleCheckAnswer = () => {
    /* 예시: 선택한 사진 3장이 모두 맞는지 확인하는 로직 (간단한 예로 id가 1, 2, 3일 때 정답으로 가정) */
    const correctAnswerIds = [1, 2, 3];
    const selectedIds = selectedImage.map(image => image.id);
    const isCorrect = correctAnswerIds.every(id => selectedIds.includes(id));

    if (isCorrect) {
      /* 정답이면 모달 닫기 */
      handleCloseModal();
    } else {
      /* 틀리면 선택된 이미지 초기화 */ 
      setSelectedImage([]);
      alert('정답이 아닙니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles.Stage3Page}>
      <img className={styles.Stage3wall} src={Stage3wall} alt="스테이지3벽" />
      <button onClick={handleOpenModal} className={styles.Button}>
        시작
      </button>


      <Modal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        // onSubmit={}
        size="medium" /* 모달 크기 지정 */
        >

        {/* 사진 선택 그리드 */}
        <div className={styles.ImageGrid}>
          {imageList.map((image) => (
            <img 
              key={image.id}
              src={image.src}
              alt={image.alt}
              className={selectedImage.some(selected => selected.id === image.id) ? styles.SelectedThumbnail : styles.Thumbnail}
              onClick={() => handleImageSelect(image)} // 사진 선택 및 취소 핸들러
            />
          ))}
        </div>

        {/* 선택된 사진 표시 */}
        <div className={styles.SelectedImages}>
          {selectedImage.length > 0 ? (
            selectedImage.map((image) => (
              <img key={image.id} src={image.src} alt={image.alt} className={styles.SelectedImage} />
            ))
          ) : (
            <p>사진을 선택하세요 (최대 3장)</p>
          )}
        </div>

        {/* 정답 확인 버튼 */}
        <button 
          className={styles.CheckAnswerButton} 
          onClick={handleCheckAnswer}
          disabled={selectedImage.length !== 3} // 3장을 선택해야만 활성화
        >
          정답 확인
        </button>
      </Modal>
    </div>
  );

}

export default Stage3Page;
