import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GameOver.module.css';


function GameOver() {
  const navigate = useNavigate();

  return (
    <div className={styles.GameOver}>
      <p>친일파를 제거하지 못했습니다</p>
      <button className={styles.RestartButton} onClick={() => navigate('/Stage4room1')}>다시 시작</button>
    </div>
  );
}

export default GameOver;
