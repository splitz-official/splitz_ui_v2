import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Take_pic from "./Take_Picture";
import Bill_participants from "./Bill_participants";
import Upload_take_photo from "./Upload_take_photo";



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
            <SplitBillStack.Screen 
            name="upload_or_take_photo"
            component={Upload_take_photo}
            />
        </SplitBillStack.Navigator>
    )
}


export default function SplitBillStackNavigation() {
    return (
        <SplitBillGroup/>
    )
}