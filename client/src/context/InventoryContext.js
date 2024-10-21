import { createContext, useContext, useEffect, useState } from 'react';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  /* 컴포넌트가 처음 렌더링될 때 sesstionStorage에서 상태 복원 */
  useEffect(() => {
    const savedItems = sessionStorage.getItem('InventoryItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  /* 아이템이 변경될 때 sessionStorage에 저장 */
  useEffect(() => {
    sessionStorage.setItem('inventoryItems', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => setItems([...items, item]);

  return <InventoryContext.Provider value={{ items, addItem }}>{children}</InventoryContext.Provider>;
};
