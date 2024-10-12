import styles from './StartPage.module.css';
import Logo from '../assets/logo.png';
import Modal from '../components/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickname, setNickname] = useState('');

  const navigate = useNavigate(); /* useNavigate 훅 사용 */

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitNickname = () => {
    console.log('닉네임:', nickname); /* 닉네임을 콘솔에 출력 */
    handleCloseModal(); /* 모달 닫기 */
    navigate('/intro');
  };

  return (
    <div className={styles.BackGround}>
      <img className={styles.Logo} src={Logo} alt="독도의 기억 로고" />
      <button onClick={handleOpenModal} className={styles.Button}>
        시 작
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitNickname}
        size="small" /* 모달 크기 지정 */
      >
        <h2>닉네임을 입력하세요.</h2>
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
