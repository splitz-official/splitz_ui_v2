import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import * as SecureStore from "expo-secure-store"
import * as SplashScreen from 'expo-splash-screen';

import { AxiosProvider } from "./Axios/axiosContext";
import { useAxios } from "./Axios/axiosContext";

import LoginStackNavigation from "./splitz_app/Login_stack/Navigation_login_stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const AppContent = () => {
  const { token, initializing } = useAxios();

  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded || initializing) {
      SplashScreen.preventAutoHideAsync(); 
    } else {
      SplashScreen.hideAsync(); 
    }
  }, [fontsLoaded, initializing]);

  if (!fontsLoaded || initializing) {
    return null; 
  }

  return (
    <NavigationContainer>
        <LoginStackNavigation initialRouteName={token ? "Bottom_Tab_Home_Navigator" : "Landing_Screen"}/>
    </NavigationContainer>
  )

}

export default function App() {

  return (
    <AxiosProvider>
      <AppContent />
    </AxiosProvider>
);
}


const styles = StyleSheet.create({
  
});