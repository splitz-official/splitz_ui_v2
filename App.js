import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold, DMSans_400Regular_Italic } from '@expo-google-fonts/dm-sans';
import * as SecureStore from "expo-secure-store"
import * as SplashScreen from 'expo-splash-screen';

import { AxiosProvider } from "./Axios/axiosContext";
import { useAxios } from "./Axios/axiosContext";

import LoginStackNavigation from "./splitz_app/Login_stack/Navigation_login_stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Bottom_Tab_Navigation from "./splitz_app/App_Stack/Bottom_Tab_Navigation";
import {axiosInstance} from "./Axios/axiosInstance";

export default function App() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  async function getData() {
    //need to consider verifying the token in the future but for now this will work for MVP
    console.log("From App.js, checking for token and then getting user data")
    const token = await SecureStore.getItemAsync("access_token");
    const data = await axiosInstance.get("/user/");
    console.log("is this log workign");
    if(token && data) {
      console.log("From App.js, checking if token exists and data.status===200")
      SetIsLoggedIn(true);
      axiosInstance.setAuthToken(token);
    }else {
      console.log("From App.js, hitting else statment in token & data.status check")
      axiosInstance.setAuthToken('');
      await SecureStore.deleteItemAsync('access_token');
    }
  }

  useEffect(() => {
    getData();
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 800);
  }, [])

  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    DMSans_400Regular_Italic
  });

  if (!fontsLoaded) {
    return <View style={styles.loaderContainer}><ActivityIndicator size="large" /></View>;
  }

  return (
    <AxiosProvider>
      <NavigationContainer>
          <LoginStackNavigation initialRouteName={isLoggedIn ? "Bottom_Tab_Home_Navigator" : "Landing_Screen"}/>
      </NavigationContainer>
    </AxiosProvider>
);
}


const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
