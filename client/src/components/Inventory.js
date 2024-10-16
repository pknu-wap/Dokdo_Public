import { useState } from 'react';
import styles from '../components/Inventory.module.css';
import { ReactSortable } from 'react-sortablejs';

function Inventory() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

  return (
    <div className={styles.InventoryBox}>
      <ReactSortable
        list={items}
        setList={setItems}
        animation={150} // 150ms 애니메이션
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ReactSortable>
      <div className={styles.InventoryItemBox}>BOX</div>
    </div>
  );
}

export default Inventory;
