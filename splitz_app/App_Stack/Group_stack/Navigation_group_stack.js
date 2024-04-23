import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Create_Group_screen from './Create_Group_screen';
import Create_Group_password from './Create_Group_password';
import Groups_details from './Groups_details';
import SplitBillStackNavigation from '../Split_Bill_stack/Navigation_splitbill_stack';
import Join_Group_screen from './Join_Group_screen';

const GroupStack = createStackNavigator();

function GroupStackNavigation() {
    return (
        <GroupStack.Navigator
        screenOptions={{headerShown: false}}
        >
            <GroupStack.Screen 
            name='Create_group_screen'
            component={Create_Group_screen}/>
            <GroupStack.Screen 
            name='Create_Group_password'
            component={Create_Group_password}/>
            <GroupStack.Screen 
            name='Groups_details'
            component={Groups_details}
            />
            <GroupStack.Screen 
            name='Split_bill_stack'
            component={SplitBillStackNavigation}
            />
            <GroupStack.Screen 
            name='Join_group'
            component={Join_Group_screen}
            />
        </GroupStack.Navigator>
    )
}

export default GroupStackNavigation;
