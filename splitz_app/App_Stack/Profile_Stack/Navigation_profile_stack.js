import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from './Profile';
import Send_feedback from './Send_feedback';


const profileStack = createStackNavigator();

function ProfileStackGroup({}) {
    return (
        <profileStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='home'>
            <profileStack.Screen 
            name={"profile"}
            component={Profile}
            />
            <profileStack.Screen
            name={"feedback"}
            component={Send_feedback}
            />
        </profileStack.Navigator>
    )
}

export default function ProfileStackNavigation() {
    return (
        <ProfileStackGroup />
    )
}