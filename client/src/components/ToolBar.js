import { Link } from 'react-router-dom';
import styles from './ToolBar.module.css';

const ToolBar = ({ isStage2Open = false, isStage3Open = false } /* stage 상태(true,false) 따라 열리고 닫힘*/) => {
  return (
    <div className={styles.ToolBarBackground}>
      <Link to="/stage1" className={`${styles.ToolBartrue} ${styles.ToolBarBtn}`}>
        Stage1
      </Link>

      {isStage2Open === true ? (
        <Link to="/stage2" className={`${styles.ToolBartrue} ${styles.ToolBarBtn}`}>
          Stage2
        </Link>
      ) : (
        <span className={`${styles.ToolBarfalse} ${styles.ToolBarBtn}`}>Stage2</span> /* Link 대신 span 사용 */
      )}

      {isStage3Open === true ? (
        <Link to="/stage3" className={`${styles.ToolBartrue} ${styles.ToolBarBtn}`}>
          Stage3
        </Link>
      ) : (
        <span className={`${styles.ToolBarfalse} ${styles.ToolBarBtn}`}>Stage3</span> /* Link 대신 span 사용 */
      )}
    </div>
  );
};

export default ToolBar;
