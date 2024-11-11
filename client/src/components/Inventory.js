import { useEffect, useState } from 'react';
import styles from '../components/Inventory.module.css';
import { ReactSortable } from 'react-sortablejs';
import { useInventory } from '../context/InventoryContext';
import TaegeukKey from '../assets/stage1/RedItem.png';
import dokdoPuzzle1 from '../assets/clover.png';
import map from '../assets/stage2/Map.png';
import CodeNote from '../assets/stage2/CodeNote.png';
import GunHintImage from '../assets/GunHintImage.png';
import SpyHintImage1 from 'assets/stage3/SpyHintImage1.png';
import SpyHintImage2 from 'assets/stage3/SpyHintImage2.png';
import SpyHintImage3 from 'assets/stage3/SpyHintImage3.png';

const itemImage = {
  TaegeukKey: TaegeukKey,
  dokdoPuzzle1: dokdoPuzzle1,
  map: map,
  CodeNote: CodeNote,
  GunHintImage: GunHintImage,
  SpyHintImage1: SpyHintImage1,
  SpyHintImage2: SpyHintImage2,
  SpyHintImage3: SpyHintImage3
};

function Inventory() {
  const boxes = Array.from({ length: 8 }, (_, i) => ({ id: i + 1, items: [] }));

  const { items } = useInventory(); /* itmes를 Context에서 가져옴 */

  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    /* items에 따라 inventoryItems 업데이트 */
    const newInventoryItems = items.map((item, index) => ({
      id: index + 1,
      name: item,
      image: itemImage[item],
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
