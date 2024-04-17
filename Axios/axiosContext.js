import React, { createContext, useContext, useState, useEffect } from 'react';
import {axiosInstance, axiosInstanceMultipart} from './axiosInstance';
import * as SecureStore from 'expo-secure-store';

const AxiosContext = createContext();

export const useAxios = () => useContext(AxiosContext);

export const AxiosProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData ] = useState(null);
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
          throw new Error('No token found');
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

  //this grabs data via axiosinstance and stores it in userData variable. This use case may change and we can maybe store in AsyncStorage instead. idk
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
    <AxiosContext.Provider value={{ axiosInstanceMultipart, axiosInstance, token, userData, setUpdateCount, initializing}}>
      {children}
    </AxiosContext.Provider>
  );
};
