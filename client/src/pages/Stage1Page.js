import styles from './Stage1Page.module.css';
import ToolBar from '../components/ToolBar.js';
import { useState } from 'react';
import Door from '../assets/Stage2Door.png';

function Stage1Page() {
  const [isStage1Open, isSetStage1Open] = useState(true);

  return (
    <div className={styles.Stage1Bg}>
      <ToolBar isStage2Open={isStage1Open} />
      <div>
        {/* <button onClick={() => {}}>
          <img src={Door} />
        </button> */}
      </div>
    </div>
  );
}

export default Stage1Page;
