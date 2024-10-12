import { useState } from 'react';
import styles from './Book.module.css';
import OpenBook from '../assets/OpenBook.png';
import map from '../assets/Stage2Map.png';

const Book = () => {
  const [page, setPage] = useState(1);
  const [isMapFind, setIsMapFind] = useState(true);

  const nextPage = () => {
    if (page < 4) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className={styles.BackGround}>
      <img className={styles.Book} src={OpenBook} alt="Book" />
      <button className={styles.PreviousButton} onClick={previousPage} disabled={page === 1} />
      <button className={styles.NextButton} onClick={nextPage} disabled={page === 4} />
      {page === 4 && isMapFind === true ? (
        <button
          className={styles.Map}
          onClick={() => {
            alert('인벤토리로 슈슉');
            setIsMapFind(false);
          }}
        >
          <img src={map} />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Book;
