import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Take_pic from "./Take_Picture";



const SplitBillStack = createStackNavigator();

function SplitBillGroup() {
    return (
        <SplitBillStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Split_bill">
            <SplitBillStack.Screen 
            name="Split_bill"
            component={Take_pic}/>
        </SplitBillStack.Navigator>
    )
}


export default function SplitBillStackNavigation() {
    return (
        <SplitBillGroup/>
    )
}