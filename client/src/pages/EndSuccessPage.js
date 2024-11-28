import { useEffect, useRef } from 'react';
import styles from './EndSuccessPage.module.css';
import { useUser } from 'context/UserContext';
import Inventory from '../components/Inventory.js';
import background from '../assets/News5.png';
import letter from '../assets/letter.png';

function EndSuccessPage() {
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

  return (
    <div className={styles.Back}>
      <Inventory />

      <img className={styles.background} src={background} />
      <div className={styles.background1} />
      <img className={styles.letter} src={letter} />
    </div>
  );
}

export default EndSuccessPage;
