import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /* 세션에서 사용자 정보 가져오기 */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
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

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
