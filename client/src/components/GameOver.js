import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GameOver.module.css';

function GameOver() {
  const navigate = useNavigate();

  useEffect(() => {
    /* 뒤로 가기를 방지하기 위해 popstate 이벤트 추가 */
    const handleBackButton = (event) => {
      event.preventDefault(); /* 기본 동작 막기 */ 
      navigate('/'); /* 홈으로 강제 이동 */ 
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton); /* 이벤트 제거 */ 
    };
  }, [navigate]);

  return (
    <div className={styles.GameOver}>
      <p>친일파를 제거하지 못했습니다</p>
      <button className={styles.RestartButton} onClick={() => navigate('/')}>홈으로 가기</button>
    </div>
  );
}

export default GameOver;
