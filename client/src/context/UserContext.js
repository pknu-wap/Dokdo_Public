import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  /* Session 생성 함수 */
  const createSession = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/session/start`,
        {},
        {
          withCredentials: true /* 쿠키를 저장하기 위해 추가 */,
        }
      );
      if (response.data.sessionId) {
        setUser({ sessionId: response.data.sessionId });
      }
    } catch (error) {
      console.log('사용자 세션 생성 에러', error);
    }
  };

  /* Session에서 사용자 정보 가져오기 */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/session/status`,
          {},
          {
            withCredentials: true,
          }
        );
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
