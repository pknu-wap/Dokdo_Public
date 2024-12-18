import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ToolBar.module.css';
import { useEffect, useState } from 'react';

const ToolBar = ({ isStage2Open = false, isStage3Open = false } /* stage 상태(true,false) 따라 열리고 닫힘*/) => {
  const [selectedPage, setSelectedPage] = useState('stage1');
  const location = useLocation(); /* 현재 URL 위치 가져옴 */

  useEffect(() => {
    const path = location.pathname.replace('/', ''); /* 현재 경로에서 '/'를 제외한 값 가져옴 */
    if (path && path !== selectedPage) {
      setSelectedPage(path); /* 현재 경로에 따라 상태 업데이트 */
    }
  }, [location, selectedPage]);

  const navigate = useNavigate();

  const handleClickStage = (stage) => {
    setSelectedPage(stage); /* 먼저 상태 업데이트 */
    navigate(`/${stage}`); /* 페이지 이동 */
  };

  return (
    <div className={styles.ToolBarBackground}>
      <button
        onClick={() => handleClickStage('stage1')}
        className={`${styles.ToolBartrue} ${styles.ToolBarBtn} ${
          selectedPage === 'stage1' ? styles.ToolBarSelected : styles.ToolBarUnselected
        }`}
      >
        STAGE1
      </button>

      {isStage2Open === true ? (
        <button
          onClick={() => handleClickStage('stage2')}
          className={`${styles.ToolBartrue} ${styles.ToolBarBtn} ${
            selectedPage === 'stage2' ? styles.ToolBarSelected : styles.ToolBarUnselected
          }`}
        >
          STAGE2
        </button>
      ) : (
        <span className={`${styles.ToolBarfalse} ${styles.ToolBarBtn} ${styles.ToolBarUnselected}`}>
          STAGE2
        </span> /* Link 대신 span 사용 */
      )}

      {isStage3Open === true ? (
        <button
          onClick={() => handleClickStage('stage3')}
          className={`${styles.ToolBartrue} ${styles.ToolBarBtn} ${
            selectedPage === 'stage3' ? styles.ToolBarSelected : styles.ToolBarUnselected
          }`}
        >
          STAGE3
        </button>
      ) : (
        <span className={`${styles.ToolBarfalse} ${styles.ToolBarBtn} ${styles.ToolBarUnselected}`}>
          STAGE3
        </span> /* Link 대신 span 사용 */
      )}
    </div>
  );
};

export default ToolBar;
