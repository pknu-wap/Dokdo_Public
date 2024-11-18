import styles from './CheckNumber.module.css';
import { useState, useEffect } from 'react';
import UpButton from 'assets/Up.png';
import DownButton from 'assets/Down.png';
import CheckNumberBg from 'assets/CheckNumberBg.png';

const CheckNumber = ({ setScoreValues }) => {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);

  useEffect(() => {
    setScoreValues({ number1, number2, number3 });
  }, [number1, number2, number3, setScoreValues]);

  return (
    <div className={styles.CheckNumberBg}>
      <img className={styles.CheckNumberBgimg} src={CheckNumberBg} />

      <div className={styles.back}>
        <div className={styles.left} />
        {[
          { number: number1, set: setNumber1 },
          { number: number2, set: setNumber2 },
          { number: number3, set: setNumber3 },
        ].map((item, index) => (
          <div key={index} className={styles.Back}>
            <button
              type="button"
              className={styles.UpButton}
              onClick={() => item.set(item.number + 1)}
              disabled={item.number === 9}
            >
              <img src={UpButton} alt="up" />
            </button>
            <div className={styles.number}>{item.number}</div>
            <button
              type="button"
              className={styles.DownButton}
              onClick={() => item.set(item.number - 1)}
              disabled={item.number === 0}
            >
              <img src={DownButton} alt="down" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckNumber;
