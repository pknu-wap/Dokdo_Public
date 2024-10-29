import { useState } from 'react';
import styles from './Book.module.css';
import { useInventory } from '../context/InventoryContext.js';

import LeftPage from '../Dokdo_Private/stage2/LeftPage.png';
import RightPage from '../Dokdo_Private/stage2/RightPage.png';
import map from '../Dokdo_Private/stage2/Map.png';

const Book = ({ closeBook, setIsMapFind, isMapFind }) => {
  const [page, setPage] = useState(1);

  const handleClickNextPage = () => {
    if (page < 4) {
      setPage(page + 1);
    }
  };

  const handleClickPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const { addItem } = useInventory();

  const handleItemClick = (itemName) => {
    addItem(itemName);
  };

  return (
    <div className={styles.BackGround}>
      <img className={styles.RightBookWrapper} src={RightPage} alt="Right Page" />
      <img className={styles.LeftBookWrapper} src={LeftPage} alt="Left Page" />
      <div className={`${styles.RightBookWrapper} ${page > 1 ? styles.PreviousFlipped : ''}`}>
        <div className={styles.Page}>
          <img className={styles.Book} src={RightPage} alt="Right Page" />
        </div>
      </div>
      <div className={`${styles.LeftBookWrapper} ${page < 4 ? styles.NextFlipped : ''}`}>
        <div className={styles.Page}>
          <img className={styles.Book} src={LeftPage} alt="Left Page" />
        </div>
      </div>
      <button className={styles.PreviousButton} onClick={handleClickPreviousPage} disabled={page === 1} />
      <button className={styles.NextButton} onClick={handleClickNextPage} disabled={page === 4} />
      {page === 4 && !isMapFind ? (
        <button
          className={styles.Map}
          onClick={() => {
            handleItemClick('Stage2Map');
            setIsMapFind(true);
            closeBook();
          }}
        >
          <img src={map} alt="Map" />
        </button>
      ) : null}
    </div>
  );
};

export default Book;
