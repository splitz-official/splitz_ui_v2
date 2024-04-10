import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Receipt_details from "./Receipt_details";



const receiptDetailStack = createStackNavigator();

function ReceiptDetailGroup() {
    return (
        <receiptDetailStack.Navigator
        screenOptions={{headerShown: false}}
        >
            <receiptDetailStack.Screen
            name={'Receipt_details'}
            component={Receipt_details}
            />
            
        </receiptDetailStack.Navigator>
    )
}


export default function ReceiptDetailStackNavigation() {
    return (
        <ReceiptDetailGroup/>
    )
}