import React, { createContext, useContext } from 'react';
import axios from 'axios';

const InventoryContext2 = createContext();

export const InventoryProvider2 = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  /** 아이템 추가 함수
   *  아이템은 함수 사용 시 sessionId와 itemId를 객체로 넘겨줘야함
   *  items에 해당 아이템 이름만 저장 -> 컴포넌트에서 사진과 연동
   */
  const addItem = async (item) => {
    try {
      await axios.post(`${apiUrl}/inventory/add`, item);
    } catch (error) {
      console.error('아이템 추가 중 오류가 발생했습니다:', error);
    }
  };

  /** 아이템 삭제 */
  const deleteItem = async ({ sessionId, itemId }) => {
    try {
      await axios.delete(`${apiUrl}/inventory/delete`, {
        data: { sessionId, itemId },
      });
    } catch (error) {
      console.error('아이템 삭제 중 오류가 발생했습니다:', error);
    }
  };

  return <InventoryContext2.Provider value={{ addItem, deleteItem }}>{children}</InventoryContext2.Provider>;
};

export const useInventory2 = () => {
  const context = useContext(InventoryContext2);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
