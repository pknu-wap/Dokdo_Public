import { useContext, useEffect, useState } from 'react';
import styles from '../components/Inventory.module.css';
import { ReactSortable } from 'react-sortablejs';
import { useInventory2 } from '../context/InventoryContext2';
import taegeukKey from '../assets/stage1/RedItem.png';
import dokdoPuzzle1 from '../assets/clover.png';
import map from '../assets/stage2/Map.png';
import CodeNote from '../assets/stage2/CodeNote.png';
import GunHintImage from '../assets/GunHintImage.png';

const itemImage = {
  taegeukKey: taegeukKey,
  dokdoPuzzle1: dokdoPuzzle1,
  map: map,
  CodeNote: CodeNote,
  GunHintImage: GunHintImage,
};

function Inventory() {
  const boxes = Array.from({ length: 8 }, (_, i) => ({ id: i + 1, items2: [] }));

  const { user } = useContext();
  const items = user.inventory;

  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    /* items에 따라 inventoryItems 업데이트 */
    const newInventoryItems = items.map((item) => ({
      id: item.itemId,
      name: item.itemName,
      image: itemImage[item.itemName],
    }));

    setInventoryItems(newInventoryItems);
  }, [items]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseOverlay = () => {
    setSelectedItem(null); /* 오버레이 클릭 시 닫기 */
  };

  return (
    <>
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
              <div key={inventoryItem.id} onClick={() => handleItemClick(inventoryItem)}>
                <img src={inventoryItem.image} alt={inventoryItem.name} className={styles.InventoryItemImage} />
              </div>
            ))}
          </ReactSortable>
        </div>
      </div>

      {/* 선택된 아이템이 있을 때만 오버레이를 표시 */}
      {selectedItem && (
        <div className={styles.OverlayBg} onClick={handleCloseOverlay}>
          <img src={selectedItem.image} alt={selectedItem.name} className={styles.OverlayImage} />
        </div>
      )}
    </>
  );
}

export default Inventory;
