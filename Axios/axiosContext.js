import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import * as SecureStore from 'expo-secure-store';

const AxiosContext = createContext();

export const useAxios = () => useContext(AxiosContext);

export const AxiosProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData ] = useState(null);

  useEffect(() => {
    console.log("Context looking for token")
    const fetchToken = async () => {
      const access_token = await SecureStore.getItemAsync('access_token');
      if (access_token) {
        setToken(access_token);
        axiosInstance.setAuthToken(access_token); 
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
        if (token) {
            try {
              const response = await axiosInstance.get('/user/');
              setUserData(response.data);
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
        }
    };
    fetchUserData();
}, [token]); 


  return (
    <AxiosContext.Provider value={{ axiosInstance, token, userData }}>
      {children}
    </AxiosContext.Provider>
  );
};
