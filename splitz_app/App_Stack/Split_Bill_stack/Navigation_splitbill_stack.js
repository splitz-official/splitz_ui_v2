import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Take_pic from "./Take_Picture";
import Bill_participants from "./Bill_participants";



const SplitBillStack = createStackNavigator();

function SplitBillGroup() {
    return (
        <SplitBillStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="bill_participants">
            <SplitBillStack.Screen 
            name="split_bill"
            component={Take_pic}
            />
            <SplitBillStack.Screen 
            name="bill_participants"
            component={Bill_participants}
            />
        </SplitBillStack.Navigator>
    )
}


export default function SplitBillStackNavigation() {
    return (
        <SplitBillGroup/>
    )
}