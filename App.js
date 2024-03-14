import "react-native-gesture-handler";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold, DMSans_400Regular_Italic } from '@expo-google-fonts/dm-sans';



import LoginStackNavigation from "./splitz_app/Login_stack/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import Login_3_Username_Screen from "./splitz_app/Login_stack/Login_3_Username_Screen";
import Camera from "./splitz_app/App_Stack/Split_Bill_stack/Take_Picture";


export default function App() {

  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    DMSans_400Regular_Italic
  });

  if (!fontsLoaded) {
    return <View style={styles.loaderContainer}><ActivityIndicator size="large" /></View>;
  }

  const baseURL = "http://3.14.255.133";
 
  return (
    <Camera/>
    // <LoginStackNavigation baseURL={baseURL}/>
    // <Login_3_Username_Screen />
);
}



const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
