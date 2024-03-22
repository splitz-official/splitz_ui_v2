import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import * as SecureStore from "expo-secure-store"
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Landing from './Landing_Screen';
import Login_Screen_2 from './Login_1_Phone_Input_Screen';
import Bottom_Tab_Navigation from '../App_Stack/Bottom_Tab_Navigation';
import Login_2_OTP_Screen from './Login_2_OTP_Screen';
import Login_3_Username_Screen from './Login_3_Username_Screen';
import { useAxios } from '../../Axios/axiosContext';

const LoginStack = createStackNavigator();

function LoginStackGroup({ initialRouteName }) {

    return (
        <LoginStack.Navigator 
        screenOptions={{headerShown: false}}
        initialRouteName={initialRouteName}>
            <LoginStack.Screen 
            name="Landing_Screen" 
            component={Landing}
            />
            <LoginStack.Screen 
            name="Phone_Input_Screen" 
            component={Login_Screen_2}
            />
            <LoginStack.Screen
            name="OTP_Screen"
            component={Login_2_OTP_Screen}
            />
            <LoginStack.Screen
            name='Username_Input_Screen'
            component={Login_3_Username_Screen}
            />
            <LoginStack.Screen
            name="Bottom_Tab_Home_Navigator"
            component={Bottom_Tab_Navigation}
            />
        </LoginStack.Navigator>
    );
}

export default function LoginStackNavigation({ initialRouteName }) {
    return (
            <LoginStackGroup initialRouteName={initialRouteName}/>
    )
}