import styles from './StartPage.module.css';
import Logo from 'assets/logo2.png';
import { UserContext } from 'context/UserContext';
import { useContext } from 'react';

function StartPage() {
  const { createSession } = useContext(UserContext);

  const handleStartBtnClick = async () => {
    try {
      await createSession();
    } catch (error) {
      console.error('세션 생성 중 오류 발생: ', error);
    }
  };

  return (
    <div className={styles.BackGround}>
      <img className={styles.Logo} src={Logo} alt="독도의 기억 로고" />
      <button onClick={handleStartBtnClick} className={styles.Button}>
        시 작
      </button>
    </div>
  );
}

export default StartPage;
