import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import News1 from 'Dokdo_Private/News1.png';
import News2 from 'Dokdo_Private/News2.png';
import styles from '../pages/NewsPage.module.css';

function NewsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [News1, News2];
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === images.length - 1) {
        clearInterval(interval);
        navigate('/stage1');
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length, navigate]);

  return (
    <div className={styles.SlideContainer}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          className={`${styles.Slide} ${index === currentIndex ? styles.ActiveSlide : styles.PreviousSlide}`}
          alt={`News ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default NewsPage;
