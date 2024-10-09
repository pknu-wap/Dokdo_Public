import styles from './IntroPage.module.css';
import { useNavigate } from 'react-router-dom';

function IntroPage() {
  const navigate = useNavigate();

  const handleAnimationEnd = () => {
    navigate('/intro/news');
  };

  return (
    /* onAnimationEnd : CSS 애니메이션이 끝났을 때 호출되는 React 이벤트 핸들러 */
    <div className={styles.IntroBg}>
      <div className={`${styles.Unvisible} ${styles.Center} ${styles.FadeInOut}`} onAnimationEnd={handleAnimationEnd}>
        본 게임은 허구의 이야기로, 실제 역사와는 무관합니다.
      </div>
    </div>
  );
}

export default IntroPage;
