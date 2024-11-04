import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  /* Session 생성 함수 */
  const createSession = async () => {
    try {
      const response = await axios.post(`${apiUrl}/session/start`);
      if (response.data.sessionId) {
        setUser({ sessionId: response.data.sessionId }); /* 여기 나중에 api 명세서 완성되면 수정 필요 */
      }
    } catch (error) {
      console.log('사용자 세션 생성 에러', error);
    }
  };

  /* Session에서 사용자 정보 가져오기 */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/sesstion/status`);
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.log('세션 api 에러', error);
      }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, setUser, createSession }}>{children}</UserContext.Provider>;
};
