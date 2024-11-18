import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GameOver.module.css';


function GameOver() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>게임 종료</h1>
      <p>목숨을 모두 잃었습니다.</p>
      <button onClick={() => navigate('/Stage4room1')}>다시 시작하기</button>
    </div>
  );
}

export default GameOver;
