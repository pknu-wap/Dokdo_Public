import './Stage2Page.css';
import ToolBar from '../components/ToolBar.js';
import { useState } from 'react';
import Door from '../assets/Stage2Door.png';

function Stage1Page() {
  const [isStage1Open, isSetStage1Open] = useState(true);

  return (
    <div>
      <ToolBar isStage2Open={isStage1Open} />
      <div className="Stage2Door">
        <button onClick={() => {}}>
          <img src={Door} />
        </button>
      </div>
      <div className="Inventory" />
    </div>
  );
}

export default Stage1Page;
