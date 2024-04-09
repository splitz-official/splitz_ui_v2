import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Create_Group_screen from './Create_Group_screen';
import Create_Group_password from './Create_Group_password';



const CreateGroupStack = createStackNavigator();

function CreateGroupStackGroup({}) {
    return (
        <CreateGroupStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='home'>
            <CreateGroupStack.Screen 
            name='Create_group_screen'
            component={Create_Group_screen}/>
            <CreateGroupStack.Screen 
            name='Create_Group_password'
            component={Create_Group_password}/>
        </CreateGroupStack.Navigator>
    )
}

export default function CreateGroupStackNavigation() {
    return (
        <CreateGroupStackGroup />
    )
}