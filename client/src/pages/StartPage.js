import styles from './StartPage.module.css';
import Logo from '../assets/logo.png';
import Modal from '../components/Modal';
import { useState } from 'react';

function StartPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickname, setNickname] = useState();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitNickname = () => {
    console.log('닉네임:', nickname); // 닉네임을 콘솔에 출력
    handleCloseModal(); // 모달 닫기
  };

  return (
    <div className={styles.BackGround}>
      <img className={styles.Logo} src={Logo} alt="독도의 기억 로고" />
      <button onClick={handleOpenModal} className={styles.Button}>
        시작
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="닉네임 입력"
        onSubmit={handleSubmitNickname}
        size="small" // 모달 크기 지정
      >
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력하세요"
          required
        />
      </Modal>
    </div>
  );
}

export default StartPage;
