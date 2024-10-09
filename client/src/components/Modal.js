import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, children, onSubmit, size = 'medium' }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
    onClose();
  };

  if (!isOpen) return null; /* 모달이 열리지 않으면 아무것도 렌더링하지 않음 */

  return (
    <div className={styles.ModalContainer}>
      <div className={styles.ModalContent}>
        <div className={`${styles.ModalContent} ${styles[size]}`} onSubmit={handleSubmit}>
          <form onSubmit={handleSubmit}>
            <div className={styles.CloseButtonBox}>
              <button className={styles.CloseButton} type="button" onClick={onClose}>
                X
              </button>
            </div>
            {children}
            <button type="submit">확인</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
