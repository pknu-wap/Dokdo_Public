import React from 'react';
import R3BoardZoom from './R3/R3BoardZoom'; 

const R3Modal = () => {
  const handleOpenModal = () => {
    console.log('모달이 열렸습니다.');
  };

  const handleCloseModal = () => {
    console.log('모달이 닫혔습니다.');
  };

  return (
    <div>
      <h1>R3Modal</h1>
      <R3BoardZoom onOpenModal={handleOpenModal} onCloseModal={handleCloseModal} />
    </div>
  );
};

export default R3Modal;
