import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";

import LandingScreen from "./screens/LandingScreen";

const Stack = createStackNavigator();

function LoginNavigator({ baseURL }) {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        initialParams={{ baseURL: baseURL }}
      />
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        initialParams={{ baseURL: baseURL }}
      />
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        initialParams={{ baseURL: baseURL }}
      />
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        initialParams={{ baseURL: baseURL }}
      />
    </Stack.Navigator>
  );
}

export default LoginStack;
