import React, { useState } from 'react';
import './R3.css';
import R3Modal from '../R3Modal';

const R3BoardZoom = ({ onOpenModal, onCloseModal }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리
  const [selectedImage, setSelectedImage] = useState(''); // 선택된 이미지 관리

  const handleImageClick = (image) => {
    setIsZoomed(prevState => !prevState); // 클릭 시 확대 상태 토글
    setSelectedImage(image); // 클릭된 이미지 선택
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // 모달 열기
    if (onOpenModal) onOpenModal(); // props로 전달된 onOpenModal 호출
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
    if (onCloseModal) onCloseModal(); // props로 전달된 onCloseModal 호출
  };
  
  return (
    <div className="image-container">
      <img
        src="board.png" 
        alt="게시판"
        className={`board ${isZoomed ? 'zoomed' : ''}`} // 상태에 따라 클래스 적용
        onClick={() => handleImageClick('board.png')} // 클릭 이벤트
      />
      <img
        src="tae.jpg" 
        alt="태극기"
        className={`tae ${isZoomed ? 'zoomed' : ''}`} // 상태에 따라 클래스 적용
        onClick={() => handleImageClick('tae.png')} // 클릭 이벤트
      />
      <img
        src="uk.png" 
        alt="욱일기"
        className={`uk ${isZoomed ? 'zoomed' : ''}`} // 상태에 따라 클래스 적용
        onClick={() => handleImageClick('uk.png')} // 클릭 이벤트
      />
      <img
        src="jp.png" 
        alt="일본국기"
        className={`jp ${isZoomed ? 'zoomed' : ''}`} // 상태에 따라 클래스 적용
        onClick={() => handleImageClick('jp.png')} // 클릭 이벤트
      />

      {/* 확대된 경우에만 모달 열기 버튼 표시 */}
      {isZoomed && (
        <button className="openModalbutton" onClick={handleOpenModal}>
          정답찾기
        </button>
      )}

      {/* 모달 */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>친일파를 고르시오</h2>
            <img
              src={selectedImage} // 선택된 이미지를 모달에 표시
              alt="사진"
              className="modal-image"
            />
            <button className="close-modal-button" onClick={handleCloseModal}>
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default R3BoardZoom;
