import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Create_Group_screen from './Create_Group_screen';
import Create_Group_password from './Create_Group_password';
import Groups_details from './Groups_details';
import ReceiptDetailStackNavigation from '../Receipt_details_stack/Navigation_receipt_details_stack';



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
            <CreateGroupStack.Screen 
            name='Groups_details'
            component={Groups_details}
            />
            <CreateGroupStack.Screen 
            name='Receipt_details_stack'
            component={ReceiptDetailStackNavigation}
            />
        </CreateGroupStack.Navigator>
    )
}

export default function CreateGroupStackNavigation() {
    return (
        <CreateGroupStackGroup />
    )
}