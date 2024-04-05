import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home_screen from './Home_screen';
import SplitBillStackNavigation from '../Split_Bill_stack/Navigation_splitbill_stack';
import CreateGroupStackNavigation from '../Create_Group_stack/Navigation_create_group_stack';
import JoinGroupStackNavigation from '../Create_Group_stack/Navigation_join_group_stack';
import Groups_details from './Groups_details';


const HomeStack = createStackNavigator();

function HomeStackGroup({}) {
    return (
        <HomeStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='home'>
            <HomeStack.Screen 
            name='home'
            component={Home_screen}/>
              
            <HomeStack.Screen 
            name='Split_bill_stack'
            component={SplitBillStackNavigation}/>
              
            <HomeStack.Screen 
            name='CreateGroupStackNavigation'
            component={CreateGroupStackNavigation}/>
              
            <HomeStack.Screen 
            name='JoinGroupStackNavigation'
            component={JoinGroupStackNavigation}/>
              
            <HomeStack.Screen
            name='Groups_details'
            component={Groups_details}/>
        </HomeStack.Navigator>
    )
}

export default function HomeStackNavigation() {
    return (
        <HomeStackGroup />
    )
}