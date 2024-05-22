import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance } from './axiosInstance';
import * as SecureStore from 'expo-secure-store';

const AxiosContext = createContext();

export const useAxios = () => useContext(AxiosContext);

export const AxiosProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    const fetchTokenAndVerifyUser = async () => {
      try {
        const access_token = await SecureStore.getItemAsync('access_token');
        if (access_token) {
          axiosInstance.setAuthToken(access_token);
          const response = await axiosInstance.get('/user/');
          if (response.data && response.status === 200) {
            setToken(access_token);
            setUserData(response.data);
          } else {
            throw new Error('Invalid token or failed to fetch user data');
          }
        } else {
          console.log('No token found, setting token to null');
          setToken(null);
          setUserData(null);
        }
      } catch (error) {
        console.error('Initialization error:', error);
        axiosInstance.setAuthToken('');
        await SecureStore.deleteItemAsync('access_token');
        setToken(null);
        setUserData(null);
      } finally {
        setInitializing(false);
      }
    };

    fetchTokenAndVerifyUser();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (token && updateCount > 0) {
        try {
          const response = await axiosInstance.get('/user/');
          if (response.data && response.status === 200) {
            setUserData(response.data);
          } else {
            console.error('Failed to refresh user data');
          }
        } catch (error) {
          console.error('Error fetching user data on update:', error);
        }
      }
    };
    fetchUserData();
  }, [updateCount]);

  return (
    <AxiosContext.Provider value={{ axiosInstance, token, userData, setUpdateCount, initializing, setToken, setUserData }}>
      {children}
    </AxiosContext.Provider>
  );
};
