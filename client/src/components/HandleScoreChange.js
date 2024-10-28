import styles from './HandleScoreChange.module.css';
import { useState } from 'react';
import Back from '../assets/background.png';
import UpButton from '../assets/Up.png';
import DownButton from '../assets/Down.png';

const HandleScoreChange = ({ onSubmit }) => {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);

  const increaseNumber1 = () => {
    setNumber1((prev) => prev + 1);
  };

  const decreaseNumber1 = () => {
    setNumber1((prev) => prev - 1);
  };
  const increaseNumber2 = () => {
    setNumber2((prev) => prev + 1);
  };

  const decreaseNumber2 = () => {
    setNumber2((prev) => prev - 1);
  };
  const increaseNumber3 = () => {
    setNumber3((prev) => prev + 1);
  };

  const decreaseNumber3 = () => {
    setNumber3((prev) => prev - 1);
  };

  const handleConfirm = () => {
    onSubmit({ number1, number2, number3 });
  };

  return (
    <div className={styles.back}>
      <div className={styles.Back}>
        <img className={styles.buttonBack} src={Back} alt="background" />
        <button type="button" className={styles.UpButton} onClick={increaseNumber1} disabled={number1 === 9}>
          <img src={UpButton} alt="up" />
        </button>
        <div className={styles.number}>{number1}</div>
        <button type="button" className={styles.DownButton} onClick={decreaseNumber1} disabled={number1 === 0}>
          <img src={DownButton} alt="down" />
        </button>
      </div>
      <div className={styles.Back}>
        <img className={styles.buttonBack} src={Back} alt="background" />
        <button type="button" className={styles.UpButton} onClick={increaseNumber2} disabled={number2 === 9}>
          <img src={UpButton} alt="up" />
        </button>
        <div className={styles.number}>{number2}</div>
        <button type="button" className={styles.DownButton} onClick={decreaseNumber2} disabled={number2 === 0}>
          <img src={DownButton} alt="down" />
        </button>
      </div>
      <div className={styles.Back}>
        <img className={styles.buttonBack} src={Back} alt="background" />
        <button type="button" className={styles.UpButton} onClick={increaseNumber3} disabled={number3 === 9}>
          <img src={UpButton} alt="up" />
        </button>
        <div className={styles.number}>{number3}</div>
        <button type="button" className={styles.DownButton} onClick={decreaseNumber3} disabled={number3 === 0}>
          <img src={DownButton} alt="down" />
        </button>
      </div>
    </div>
  );
};

export default HandleScoreChange;
