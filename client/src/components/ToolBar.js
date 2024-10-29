import { Link } from 'react-router-dom';
import styles from './ToolBar.module.css';

const ToolBar = ({ isStage2Open = false, isStage3Open = false } /* stage 상태(true,false) 따라 열리고 닫힘*/) => {
  return (
    <div>
      <div className={styles.ToolBarBackground} />
      <Link to="/Stage1" className={styles.ToolBartrue}>
        Stage1
      </Link>
      {isStage2Open === true ? (
        <Link to="/Stage2Page" className={styles.ToolBartrue}>
          Stage2
        </Link>
      ) : (
        <Link className={styles.ToolBarfalse}>Stage2</Link>
      )}

      {isStage3Open === true ? (
        <Link to="/Stage3Page" className={styles.ToolBartrue}>
          Stage3
        </Link>
      ) : (
        <Link className={styles.ToolBarfalse}>Stage3</Link>
      )}
    </div>
  );
};

export default ToolBar;
