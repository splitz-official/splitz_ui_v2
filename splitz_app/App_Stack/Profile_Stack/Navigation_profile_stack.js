import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from './Profile';


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
        </profileStack.Navigator>
    )
}

export default function ProfileStackNavigation() {
    return (
        <ProfileStackGroup />
    )
}