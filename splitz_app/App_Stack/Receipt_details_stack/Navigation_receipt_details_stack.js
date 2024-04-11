import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Receipt_items from "./Receipt_items";



const receiptDetailStack = createStackNavigator();

function ReceiptDetailGroup() {
    return (
        <receiptDetailStack.Navigator
        screenOptions={{headerShown: false}}
        >
            <receiptDetailStack.Screen
            name={'Receipt_details'}
            component={Receipt_items}
            />
            
        </receiptDetailStack.Navigator>
    )
}


export default function ReceiptDetailStackNavigation() {
    return (
        <ReceiptDetailGroup/>
    )
}