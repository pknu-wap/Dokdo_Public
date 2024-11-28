import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import News1 from 'assets/News1.png';
import News2 from 'assets/News2.png';
import News3 from 'assets/News3.png';
import News4 from 'assets/News4.png';
import News5 from 'assets/News5.png';
import styles from '../pages/NewsPage.module.css';

function NewsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [News1, News2, News3, News4, News5];
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === images.length - 1) {
        clearInterval(interval);
        navigate('/stage1');
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 3500);
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
