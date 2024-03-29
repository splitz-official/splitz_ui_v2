import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import * as SecureStore from 'expo-secure-store';

const AxiosContext = createContext();

export const useAxios = () => useContext(AxiosContext);

export const AxiosProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData ] = useState(null);


  //potential bluetooth usecase for later
  useEffect(() => {
    // console.log("Checking for token via securestore from context")
    const fetchToken = async () => {
      const access_token = await SecureStore.getItemAsync('access_token');
      if (access_token) {
        setToken(access_token);
        axiosInstance.setAuthToken(access_token);
      }
    };

    fetchToken();
  }, []);

  //this grabs data via axiosinstance and stores it in userData variable. This use case may change and we can maybe store in AsyncStorage instead. idk
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          // console.log("fetching user data from context")
          const response = await axiosInstance.get('/user/');
          setUserData(response.data);
        } catch (error) {
          console.error('From context: Error fetching user data:', error);
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
