import { useState } from 'react';
import styles from '../components/Inventory.module.css';
import { ReactSortable } from 'react-sortablejs';
import CloseBtn from '../Dokdo_Private/CloseBtn.png';

function Inventory() {
  const [boxes, setBoxes] = useState(Array.from({ length: 8 }, (_, i) => ({ id: i + 1, items: [] })));

  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: 'Key', image: CloseBtn, action: () => alert('This is a key!') },
    { id: 2, name: 'Map', image: CloseBtn, action: () => alert('This is a map!') },
    { id: 3, name: 'Flashlight', image: CloseBtn, action: () => alert('This is a flashlight!') },
  ]);

  /* 아이템 클릭 핸들러 */
  const handleItemClick = (item) => {
    item.action(); /* 클릭 시 아이템의 액션 실행 */
  };

  return (
    <div className={styles.InventoryContainer}>
      <div className={styles.InventoryGrid}>
        <ReactSortable
          list={inventoryItems}
          setList={setInventoryItems}
          animation={200} /* 드래그 앤 드롭 애니메이션 */
          className={styles.InventoryList}
        >
          {inventoryItems.map((item) => (
            <div
              key={item.id}
              className={styles.InventoryItem}
              onClick={() => handleItemClick(item)} /* 아이템 클릭 시 해당 아이템의 액션 실행 */
            >
              <img src={item.image} alt={item.name} className={styles.InventoryItemImage} />
            </div>
          ))}
        </ReactSortable>
        {boxes.map((box) => (
          <div key={box.id} className={styles.InventoryItemBox}>
            {/* 박스 배경 */}
            <div className={styles.InventoryBoxBackground}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
