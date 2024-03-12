import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from './Landing_Screen';
import Login_Screen_2 from './Login_1_Phone_Input_Screen';
import { NavigationContainer } from '@react-navigation/native';
import Bottom_Tab_Navigation from '../App_Stack/Bottom_Tab_Navigation';
import Login_2_OTP_Screen from './Login_2_OTP_Screen';
import Login_3_Username_Screen from './Login_3_Username_Screen';

const LoginStack = createStackNavigator();

function LoginStackGroup({ baseURL }) {
    return (
        <LoginStack.Navigator 
        screenOptions={{headerShown: false}}
        initialRouteName='Landing Screen'>
            <LoginStack.Screen 
            name="Landing_Screen" 
            component={Landing}
            initialParams={{ baseURL: baseURL }}/>
            <LoginStack.Screen 
            name="Phone_Input_Screen" 
            component={Login_Screen_2}
            initialParams={{ baseURL: baseURL }}/>
            <LoginStack.Screen
            name="OTP_Screen"
            component={Login_2_OTP_Screen}
            initialParams={{ baseURL: baseURL}}/>
            <LoginStack.Screen
            name='Username_Input_Screen'
            component={Login_3_Username_Screen}
            initialParams={{ baseURL: baseURL}}/>
            <LoginStack.Screen
            name="Bottom_Tab_Home_Navigator"
            component={Bottom_Tab_Navigation}
            initialParams={{ baseURL: baseURL }}
            />
        </LoginStack.Navigator>
    );
}

export default function LoginStackNavigation({ baseURL }) {
    return (
        <NavigationContainer>
            <LoginStackGroup baseURL={baseURL}/>
        </NavigationContainer>
    )
}