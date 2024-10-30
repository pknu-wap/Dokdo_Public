import { useState, useEffect } from 'react';
import styles from './Book.module.css';
import { useInventory } from '../context/InventoryContext.js';

import LeftPage from 'assets/stage2/LeftPage.png';
import RightPage from 'assets/stage2/RightPage.png';
import map from 'assets/stage2/Map.png';

const Book = ({ closeBook, setIsMapFind, isMapFind }) => {
  const [page, setPage] = useState(1);
  const [showMapButton, setShowMapButton] = useState(false);
  const [zIndex, setZIndex] = useState({ left: 2, right: 1 });

  const handleClickNextPage = () => {
    if (page < 5) {
      setPage(page + 1);
    }
  };

  const handleClickPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const updateZIndex = async () => {
      console.log('Page changed:', page);
      await delay(500);

      if (page === 2) {
        setZIndex({ left: 2, right: 1 });
      } else if (page === 3) {
        setZIndex({ left: 2, right: 1 });
      } else if (page === 4) {
        setZIndex({ left: 2, right: 1 });
      } else {
        setZIndex({ left: 1, right: 2 });
      }
    };

    updateZIndex();
  }, [page]);

  const { addItem } = useInventory();

  const handleItemClick = (itemName) => {
    addItem(itemName);
  };

  useEffect(() => {
    const showMapButtonAfterDelay = async () => {
      if (page === 4 && !isMapFind) {
        await delay(300);
        setShowMapButton(true);
      } else if (page === 5) {
        closeBook();
      } else {
        setShowMapButton(false);
      }
    };

    showMapButtonAfterDelay();
  }, [page, isMapFind]);

  return (
    <div className={styles.BackGround}>
      <img className={styles.RightBookWrapper1} src={RightPage} alt="Right Page" />
      <img className={styles.LeftBookWrapper1} src={LeftPage} alt="Left Page" />

      <div
        className={`${styles.RightBookWrapper} ${page > 1 ? styles.PreviousFlipped : ''}`}
        style={{ zIndex: zIndex.right }}
      >
        <div className={styles.Page}>
          <img className={styles.Book} src={RightPage} alt="Right Page" />
        </div>
      </div>

      <div
        className={`${styles.LeftBookWrapper} ${page < 4 ? styles.NextFlipped : ''}`}
        style={{ zIndex: zIndex.left }}
      >
        <div className={styles.Page}>
          <img className={styles.Book} src={LeftPage} alt="Left Page" />
        </div>
      </div>

      <button
        className={styles.PreviousButton}
        onClick={handleClickPreviousPage}
        disabled={page === 1}
        style={{ zIndex: 3 }}
      />
      <button className={styles.NextButton} onClick={handleClickNextPage} disabled={page === 5} style={{ zIndex: 3 }} />

      {showMapButton && !isMapFind ? (
        <button
          className={styles.Map}
          onClick={() => {
            handleItemClick('map');
            setIsMapFind(true);
            closeBook();
          }}
          style={{ zIndex: 3 }}
        >
          <img src={map} alt="Map" />
        </button>
      ) : null}
    </div>
  );
};

export default Book;
