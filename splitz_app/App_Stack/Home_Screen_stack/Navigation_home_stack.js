import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home_screen from './Home_screen';
import SplitBillStackNavigation from '../Split_Bill_stack/Navigation_splitbill_stack';
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
            name='Groups_details'
            component={Groups_details}
            />
        </HomeStack.Navigator>
    )
}

export default function HomeStackNavigation() {
    return (
        <HomeStackGroup />
    )
}