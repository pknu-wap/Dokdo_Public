import { useEffect, useState } from 'react';
import styles from '../components/Inventory.module.css';
import { ReactSortable } from 'react-sortablejs';
import CloseBtn from '../Dokdo_Private/CloseBtn.png';
import { useInventory } from '../context/InventoryContext';
import TaegeukKey from '../Dokdo_Private/stage1/RedItem.png';
import Clover from '../assets/clover.png';

const itemImage = {
  Key: CloseBtn,
  TaegeukKey: TaegeukKey,
  Clover: Clover,
};

function Inventory() {
  const boxes = Array.from({ length: 8 }, (_, i) => ({ id: i + 1, items: [] }));

  const { items } = useInventory(); /* itmes를 Context에서 가져옴 */

  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: 'Key', image: itemImage['Key'], action: () => alert('This is a key!') },
  ]);

  useEffect(() => {
    /* items에 따라 inventoryItems 업데이트 */
    const newInventoryItems = items.map((item, index) => ({
      id: index + 1,
      name: item,
      image: itemImage[item],
      action: () => alert(`${item}`),
    }));

    setInventoryItems(newInventoryItems);
  }, [items]);

  return (
    <div className={styles.InventoryContainer}>
      <div className={styles.InventoryGrid}>
        {boxes.map((box) => (
          <div key={box.id} className={styles.InventoryItemBox}>
            {/* 박스 배경 */}
            <div className={styles.InventoryBoxBackground}></div>
          </div>
        ))}
        <ReactSortable
          list={inventoryItems}
          setList={setInventoryItems}
          animation={150} /* 드래그 앤 드롭 애니메이션 */
          className={styles.InventoryList}
        >
          {inventoryItems.map((inventoryItem) => (
            <div key={inventoryItem.id} onClick={inventoryItem.action}>
              <img src={inventoryItem.image} alt={inventoryItem.name} className={styles.InventoryItemImage} />
            </div>
          ))}
        </ReactSortable>
      </div>
    </div>
  );
}

export default Inventory;
