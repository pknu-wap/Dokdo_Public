import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [hearts, setHearts] = useState(3);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  /* 유저 정보 가져오기 */
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/session/status?sessionId=${sessionId}`, {
        withCredentials: true,
      });

      if (response.data) {
        setUser(response.data);
        return response.data;
      } else {
        console.log('유저 데이터가 없습니다.');
        return null;
      }
    } catch (error) {
      console.log('유저 정보 GET API 에러', error);
    }
  };

  /* Session 생성 함수 */
  const createSession = async () => {
    try {
      const response = await axios.post(`${apiUrl}/session/start`, null, {
        withCredentials: true /* 쿠키를 저장하기 위해 추가 */,
      });

      const newSessionId = response.data.sessionId;

      if (newSessionId) {
        setSessionId(newSessionId);
        navigate('/stage1');
      } else {
        console.log('세션 ID를 쿠키에서 가져오지 못했습니다.');
      }
    } catch (error) {
      console.log('사용자 세션 생성 요청 실패', error);
    }
  };

  /* Stage Clear 함수 */
  const stageClear = async (stageId) => {
    try {
      const response = await axios.post(`${apiUrl}/stage/${stageId}/clear?sessionId=${sessionId}`, null, {
        withCredentials: true,
      });

      const clearedStage = response.data.stages;
      return clearedStage;
    } catch (error) {
      console.log('Stage Clear POST 요청 실패', error);
    }
  };

  /* 미션 클리어 여부 확인 함수 */
  const missionClear = async ({ stageId, itemName }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/stage/${stageId}/attempt?sessionId=${sessionId}&itemName=${itemName}`,
        null,
        {
          withCredentials: true,
        }
      );

      const clearedStage = response.data;
      return clearedStage;
    } catch (error) {
      console.log('Mission Clear POST 요청 실패', error);
    }
  };

  /* 하트 개수 확인 함수 */
  const getHearts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/stage/4/status?sessionId=${sessionId}`, null, {
        withCredentials: true,
      });

      if (response.data.remainingHearts) {
        const remainingHearts = response.data.remainingHearts;
        setHearts(remainingHearts);
      }

      return hearts;
    } catch (error) {
      console.log('Stage Clear POST 요청 실패', error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, fetchUser, createSession, stageClear, missionClear, getHearts, hearts }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
