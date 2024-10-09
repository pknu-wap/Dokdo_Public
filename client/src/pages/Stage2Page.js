import './Stage2Page.css';
import ToolBar from '../components/ToolBar.js';
import { useState } from 'react';
import BoxOpen from '../assets/Stage2BoxOpen.png';
import BoxClose from '../assets/Stage2Box.png';
import Door from '../assets/Stage2Door.png';

function Stage2Page() {
  const [changeimage, setChangeImage] = useState(BoxClose);
  const [isStage2Open, isSetStage2Open] = useState(true);
  const handleChangeImage = () => {
    setChangeImage(BoxOpen);
    setTimeout(() => {
      setChangeImage(BoxClose);
      console.log('지연완료');
    }, 1000);
  };
  return (
    <div>
      <ToolBar isStage2Open={isStage2Open} />
      <div className="Stage2Door">
        <button onClick={() => {}}>
          <img src={Door} />
        </button>
      </div>
      <div className="Stage2Box">
        <button
          onClick={() => {
            handleChangeImage();
          }}
        >
          <img src={changeimage} alt="loading" />
        </button>
      </div>
      <div className="Inventory" />
    </div>
  );
}

export default Stage2Page;
