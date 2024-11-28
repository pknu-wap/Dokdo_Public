import { useEffect, useRef } from 'react';
import styles from './EndFailPage.module.css';
import { useUser } from 'context/UserContext';
import Inventory from '../components/Inventory.js';

function EndFailPage() {
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
    <div>
      <Inventory />

      <div className={styles.Back}>당신은 결국 독도를 되찾지 못하였습니다.</div>
    </div>
  );
}

export default EndFailPage;
