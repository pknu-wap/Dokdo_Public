import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './Stage2Page.css';
import ToolBar from '../components/ToolBar.js';
import { useState } from 'react';
import BoxOpen from '../assets/Stage2BoxOpen.png';
import BoxClose from '../assets/Stage2Box.png';
import Door from '../assets/Stage2Door.png';

function Stage2Page() {
  const [image, setImage] = useState(BoxClose);
  const handleImage = () => {
    setImage(BoxOpen);
    setTimeout(() => {
      setImage(BoxClose);
      console.log('지연완료');
    }, 1000);
  };
  return (
    <div>
      <ToolBar> </ToolBar>
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
          <img src={image} alt="loading" />
        </button>
      </div>
      <div className="Inventory" />
    </div>
  );
}

export default Stage2Page;
