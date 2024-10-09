import './Stage2Page.css';
import ToolBar from '../components/ToolBar.js';
import { useState } from 'react';
import BoxOpen from '../assets/Stage2BoxOpen.png';
import BoxClose from '../assets/Stage2Box.png';
import Door from '../assets/Stage2Door.png';

function Stage2Page() {
  const [handleChangeimage, setHandleChangeImage] = useState(BoxClose);
  const [isStage2, isSetStage2] = useState(true);
  const handleImage = () => {
    setHandleChangeImage(BoxOpen);
    setTimeout(() => {
      setHandleChangeImage(BoxClose);
      console.log('지연완료');
    }, 1000);
  };
  return (
    <div>
      <ToolBar stage2Open={isStage2} />
      <div className="Stage2Door">
        <button onClick={() => {}}>
          <img src={Door} />
        </button>
      </div>
      <div className="Stage2Box">
        <button
          onClick={() => {
            handleImage();
          }}
        >
          <img src={handleChangeimage} alt="loading" />
        </button>
      </div>
      <div className="Inventory" />
    </div>
  );
}

export default Stage2Page;
