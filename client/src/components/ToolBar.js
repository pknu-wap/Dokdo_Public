import { Link } from 'react-router-dom';
import styles from './ToolBar.module.css';

const ToolBar = ({ stage2Open = false, stage3Open = false } /* stage 상태(true,false) 따라 열리고 닫힘*/) => {
  return (
    <div>
      <div className={styles.ToolBarBackground} />
      <Link to="/Stage1" className={styles.ToolBartrue}>
        Stage1
      </Link>
      {stage2Open === true ? (
        <Link to="/Stage2Page" className={styles.ToolBartrue}>
          Stage2
        </Link>
      ) : (
        <Link className={styles.ToolBarfalse}>Stage2</Link>
      )}

      {stage3Open === true ? (
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
