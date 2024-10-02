import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, title, children, onSubmit, size = 'medium' }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
    onClose(); // 모달 닫기
  };

  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <div className={styles.ModalContainer}>
      <div className={styles.ModalContent}>
        <div className={`${styles.ModalContent} ${styles[size]}`}>
          <h2>{title}</h2>
          <form onSubmit={handleSubmit}>
            {children}
            <button type="submit">제출</button>
            <button type="button" onClick={onClose}>
              취소
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
