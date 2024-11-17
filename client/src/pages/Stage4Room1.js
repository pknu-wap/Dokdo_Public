import React, { useState } from 'react';
import styles from './Stage4Room1.module.css';
import Inventory from '../components/Inventory.js';
import { useInventory } from '../context/InventoryContext';

import TopBar from 'assets/stage4/TopBar.png';
import KimChunsam from 'assets/stage4/KimChunsam.png';



function Stage4Room1() {



return(
  <div className={styles.Stage4Bg}>
    <Inventory />
      <div className={styles.TopBar} src={TopBar}/>
        <img className={styles.KimChunsam} src={KimChunsam} alt="KimChunsam" />

  </div>


);
  
};

export default Stage4Room1;