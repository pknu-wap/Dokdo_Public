import { useState } from 'react';
import styles from '../components/Inventory.module.css';
import { ReactSortable } from 'react-sortablejs';

function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: 'Key', action: () => alert('This is a key!') },
    { id: 2, name: 'Map', action: () => alert('This is a map!') },
    { id: 3, name: 'Flashlight', action: () => alert('This is a flashlight!') },
  ]);

  /* 아이템 클릭 핸들러 */
  const handleItemClick = (item) => {
    item.action(); /* 클릭 시 아이템의 액션 실행 */
  };

  return (
    <div className={styles.InventoryBox}>
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
            {item.name}
          </div>
        ))}
      </ReactSortable>
    </div>
  );
}

export default Inventory;
