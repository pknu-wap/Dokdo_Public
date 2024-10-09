import styles from './Stage3.module.css';
import Stage3wall from '../assets/stage3wall.png';
import Modal from '../components/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Stage3() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate(); /* useNavigate 훅 사용 */

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.Stage3}>
      <img className={styles.Stage3wall} src={Stage3wall} alt="스테이지3벽" />
      <button onClick={handleOpenModal} className={styles.Button}>
        시작
      </button>
      <Modal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitNickname}
        size="medium" /* 모달 크기 지정 */
        >
      </Modal>
    </div>
  );

}

export default Stage3;
