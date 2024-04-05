import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Join_Group_screen from './Join_Group_screen';



const JoinGroupStack = createStackNavigator();

function JoinGroupStackGroup({}) {
    return (
        <JoinGroupStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='home'>
            <JoinGroupStack.Screen 
            name='Join_group_screen'
            component={Join_Group_screen}/>
        </JoinGroupStack.Navigator>
    )
}

export default function JoinGroupStackNavigation() {
    return (
        <JoinGroupStackGroup />
    )
}