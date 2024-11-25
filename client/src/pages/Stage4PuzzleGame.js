import styles from './Stage4PuzzleGame.module.css';
import Inventory from '../components/Inventory.js';
import { useState, useEffect } from 'react';
import { useInventory2 } from '../context/InventoryContext2';
import { useUser } from 'context/UserContext';
import { useNavigate } from 'react-router-dom';

import dokdoPuzzle1 from '../assets/dokdoPuzzle1_2.png';
import dokdoPuzzle2 from '../assets/dokdoPuzzle2_2.png';
import dokdoPuzzle3 from '../assets/dokdoPuzzle3_2.png';
import dokdoPuzzle4 from '../assets/dokdoPuzzle4_2.png';
import dokdoPuzzleNone from '../assets/dokdoPuzzleNone.png';

function Stage4PuzzleGame() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { deleteItem } = useInventory2();
  const { user, fetchUser } = useUser();

  const [puzzle1, setPuzzle1] = useState(dokdoPuzzleNone);
  const [puzzle2, setPuzzle2] = useState(dokdoPuzzleNone);
  const [puzzle3, setPuzzle3] = useState(dokdoPuzzleNone);
  const [puzzle4, setPuzzle4] = useState(dokdoPuzzleNone);
  const [stage4PuzzleAnswer, setStage4PuzzleAnswer] = useState(false);

  const [count, setCount] = useState(1000);
  const [timerRunning, setTimerRunning] = useState(true);

  const handleDropOnPuzzle1 = (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');
    if (draggedItem === 'dokdoPuzzle1') {
      setPuzzle1(dokdoPuzzle1);
    } else if (draggedItem === 'dokdoPuzzle2') {
      setPuzzle1(dokdoPuzzle2);
    } else if (draggedItem === 'dokdoPuzzle3') {
      setPuzzle1(dokdoPuzzle3);
    } else if (draggedItem === 'dokdoPuzzle4') {
      setPuzzle1(dokdoPuzzle4);
    }
  };

  const handleDropOnPuzzle2 = (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');
    if (draggedItem === 'dokdoPuzzle1') {
      setPuzzle2(dokdoPuzzle1);
    } else if (draggedItem === 'dokdoPuzzle2') {
      setPuzzle2(dokdoPuzzle2);
    } else if (draggedItem === 'dokdoPuzzle3') {
      setPuzzle2(dokdoPuzzle3);
    } else if (draggedItem === 'dokdoPuzzle4') {
      setPuzzle2(dokdoPuzzle4);
    }
  };

  const handleDropOnPuzzle3 = (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');
    if (draggedItem === 'dokdoPuzzle1') {
      setPuzzle3(dokdoPuzzle1);
    } else if (draggedItem === 'dokdoPuzzle2') {
      setPuzzle3(dokdoPuzzle2);
    } else if (draggedItem === 'dokdoPuzzle3') {
      setPuzzle3(dokdoPuzzle3);
    } else if (draggedItem === 'dokdoPuzzle4') {
      setPuzzle3(dokdoPuzzle4);
    }
  };

  const handleDropOnPuzzle4 = (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');
    if (draggedItem === 'dokdoPuzzle1') {
      setPuzzle4(dokdoPuzzle1);
    } else if (draggedItem === 'dokdoPuzzle2') {
      setPuzzle4(dokdoPuzzle2);
    } else if (draggedItem === 'dokdoPuzzle3') {
      setPuzzle4(dokdoPuzzle3);
    } else if (draggedItem === 'dokdoPuzzle4') {
      setPuzzle4(dokdoPuzzle4);
    }
  };

  useEffect(() => {
    if (
      puzzle1 !== dokdoPuzzleNone &&
      puzzle2 !== dokdoPuzzleNone &&
      puzzle3 !== dokdoPuzzleNone &&
      puzzle4 !== dokdoPuzzleNone
    ) {
      if (
        puzzle1 === dokdoPuzzle1 &&
        puzzle2 === dokdoPuzzle2 &&
        puzzle3 === dokdoPuzzle3 &&
        puzzle4 === dokdoPuzzle4
      ) {
        setStage4PuzzleAnswer(true);
      } else {
        setPuzzle1(dokdoPuzzleNone);
        setPuzzle2(dokdoPuzzleNone);
        setPuzzle3(dokdoPuzzleNone);
        setPuzzle4(dokdoPuzzleNone);
        alert('다시 시도하세요!');
      }
    }
  }, [puzzle1, puzzle2, puzzle3, puzzle4]);

  useEffect(() => {
    if (count === 0) {
      setTimerRunning(false);
      navigate('/EndFail');
    }
  }, [count, navigate]);

  const [animatePuzzle1, setAnimatePuzzle1] = useState(false);
  const [animatePuzzle2, setAnimatePuzzle2] = useState(false);
  const [animatePuzzle3, setAnimatePuzzle3] = useState(false);
  const [animatePuzzle4, setAnimatePuzzle4] = useState(false);

  useEffect(() => {
    if (puzzle1 !== dokdoPuzzleNone) {
      setAnimatePuzzle1(true);
      setTimeout(() => setAnimatePuzzle1(false), 500);
    }
  }, [puzzle1]);

  useEffect(() => {
    if (puzzle2 !== dokdoPuzzleNone) {
      setAnimatePuzzle2(true);
      setTimeout(() => setAnimatePuzzle2(false), 500);
    }
  }, [puzzle2]);

  useEffect(() => {
    if (puzzle3 !== dokdoPuzzleNone) {
      setAnimatePuzzle3(true);
      setTimeout(() => setAnimatePuzzle3(false), 500);
    }
  }, [puzzle3]);

  useEffect(() => {
    if (puzzle4 !== dokdoPuzzleNone) {
      setAnimatePuzzle4(true);
      setTimeout(() => setAnimatePuzzle4(false), 500);
    }
  }, [puzzle4]);

  useEffect(() => {
    if (stage4PuzzleAnswer) {
      setTimerRunning(false);
    }
  }, [stage4PuzzleAnswer, navigate]);

  useEffect(() => {
    if (timerRunning) {
      const id = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 10);
      return () => clearInterval(id);
    }
  }, [timerRunning]);

  const getTimerBackground = () => {
    const percentage = count / 1000;
    const color = `linear-gradient(to right, beige ${percentage * 100}%, black ${percentage * 100}%)`;
    return color;
  };
  return (
    <div className={styles.Back}>
      <Inventory />
      <div className={styles.TimerBack}>
        <div className={styles.Timer} style={{ background: getTimerBackground() }} />
      </div>
      <div className={styles.PuzzleBack}>
        <img className={styles.dokdoPuzzleNone} src={dokdoPuzzleNone} alt="dokdoPuzzleNone" />
        <div
          className={`${styles.dokdoPuzzle1} ${animatePuzzle1 ? styles.animate : ''}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnPuzzle1}
        >
          <img
            className={`${styles.dokdoPuzzleimg1} ${puzzle1 === dokdoPuzzleNone ? styles.hidden : ''}`}
            src={puzzle1}
            alt="dokdopuzzle1"
          />
        </div>
        <div
          className={`${styles.dokdoPuzzle2} ${animatePuzzle2 ? styles.animate : ''}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnPuzzle2}
        >
          <img
            className={`${styles.dokdoPuzzleimg2} ${puzzle2 === dokdoPuzzleNone ? styles.hidden : ''}`}
            src={puzzle2}
            alt="dokdopuzzle2"
          />
        </div>
        <div
          className={`${styles.dokdoPuzzle3} ${animatePuzzle3 ? styles.animate : ''}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnPuzzle3}
        >
          <img
            className={`${styles.dokdoPuzzleimg3} ${puzzle3 === dokdoPuzzleNone ? styles.hidden : ''}`}
            src={puzzle3}
            alt="dokdopuzzle3"
          />
        </div>
        <div
          className={`${styles.dokdoPuzzle4} ${animatePuzzle4 ? styles.animate : ''}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnPuzzle4}
        >
          <img
            className={`${styles.dokdoPuzzleimg4} ${puzzle4 === dokdoPuzzleNone ? styles.hidden : ''}`}
            src={puzzle4}
            alt="dokdopuzzle4"
          />
        </div>
      </div>
    </div>
  );
}

export default Stage4PuzzleGame;
