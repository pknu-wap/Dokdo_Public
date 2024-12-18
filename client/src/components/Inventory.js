import { useEffect, useState } from 'react';
import styles from '../components/Inventory.module.css';
import { ReactSortable } from 'react-sortablejs';
import { useUser } from 'context/UserContext';

import taegeukKey from '../assets/stage1/RedItem.png';
import dokdoPuzzle1 from '../assets/dokdoPuzzle1.png';
import dokdoPuzzle2 from '../assets/dokdoPuzzle2.png';
import dokdoPuzzle3 from '../assets/dokdoPuzzle3.png';
import dokdoPuzzle4 from '../assets/dokdoPuzzle4.png';
import map from '../assets/stage2/Map.png';
import timeLocationHint from '../assets/stage2/timeLocationHint.png';
import GunHintImage from 'assets/stage3/GunHintImage.png';
import SpyHintImage from 'assets/stage3/SpyHintImage.png';

const itemImage = {
  taegeukKey: taegeukKey,
  dokdoPuzzle1: dokdoPuzzle1,
  dokdoPuzzle2: dokdoPuzzle2,
  dokdoPuzzle3: dokdoPuzzle3,
  dokdoPuzzle4: dokdoPuzzle4,
  map: map,
  timeLocationHint: timeLocationHint,
  gunHint: GunHintImage,
  japaneseInfo: SpyHintImage,
};

function Inventory() {
  const boxes = Array.from({ length: 8 }, (_, i) => ({ id: i + 1, items2: [] }));

  const { user } = useUser();
  const items = user?.inventory || [];

  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    /* items에 따라 inventoryItems 업데이트 */
    if (items.length === 0) return;

    const newInventoryItems = items.map((item) => ({
      id: item.itemId,
      name: item.itemName,
      image: itemImage[item.itemName],
    }));

    /* 새로운 items와 이전 items가 다를 경우에만 상태 업데이트 */
    if (JSON.stringify(inventoryItems) !== JSON.stringify(newInventoryItems)) {
      setInventoryItems(newInventoryItems);
    }
  }, [items, inventoryItems]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseOverlay = () => {
    setSelectedItem(null); /* 오버레이 클릭 시 닫기 */
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item.name);
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
              <div
                key={inventoryItem.id}
                onClick={() => handleItemClick(inventoryItem)}
                draggable
                onDragStart={(e) => handleDragStart(e, inventoryItem)}
              >
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
