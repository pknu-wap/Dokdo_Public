import { useState } from 'react';
import New1 from '../Dokdo_Private/News1.png';
import New2 from '../Dokdo_Private/News2.png';
import styles from '../pages/NewsPage.module.css';

function NewsPage() {
  const [isNews2, setIsNews2] = useState(false);

  const handleNews1End = () => {
    setIsNews2(true); // 첫 이미지 애니메이션 종료 시 두 번째 이미지 표시
  };

  return (
    <div>
      <img
        src={New1}
        className={`${styles.NewsImg} ${styles.FadeInOut} ${isNews2 ? styles.hidden : ''}`}
        onAnimationEnd={handleNews1End}
      />
      {isNews2 && <img src={New2} className={`${styles.NewsImg} ${styles.FadeInOut}`} />}
    </div>
  );
}

export default NewsPage;
