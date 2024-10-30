import React from 'react';
import styles from './Modal.module.css';
import CloseBtn from 'assets/CloseBtn.png';

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
      <div className={`${styles.ModalContent} ${styles[size]}`} onSubmit={handleSubmit}>
        <img className={styles.CloseBtn} src={CloseBtn} onClick={onClose} />
        <form onSubmit={handleSubmit}>
          <div className={styles.CloseButtonBox}></div>
          {children}
          <button className={styles.SubmitBtn} type="submit">
            확 인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
