import styles from './StartPage.module.css';
import Logo from '../assets/logo2.png';
import { useNavigate } from 'react-router-dom';

function StartPage() {
  const navigate = useNavigate(); /* useNavigate 훅 사용 */

  const handleStartBtnClick = () => {
    navigate('/intro');
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
