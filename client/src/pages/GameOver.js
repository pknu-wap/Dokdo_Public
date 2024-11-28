import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'context/UserContext';
import Inventory from '../components/Inventory.js';
import styles from './GameOver.module.css';

function GameOver() {
  const navigate = useNavigate();

  const { reset } = useUser();

  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      reset();
      console.log('reset 실행됨');
    } else {
      console.log('reset이 이미 실행되었습니다.');
    }
  }, [reset]);

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
    <div>
      <Inventory />
      <div className={styles.GameOver}>
        <p>친일파를 제거하지 못했습니다</p>
      </div>
    </div>
  );
}

export default GameOver;
