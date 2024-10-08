import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './Room2Page.css';
import ToolBar from '../components/ToolBar.js';
import { useState } from 'react';
import BoxOpen from '../assets/Room2BoxOpen.png';
import BoxClose from '../assets/Room2Box.png';
import Door from '../assets/Room2Door.png';

function Room2Page() {
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
      <div className="Room2Door">
        <button onClick={() => {}}>
          <img src={Door} />
        </button>
      </div>
      <div className="Room2Box">
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

export default Room2Page;
