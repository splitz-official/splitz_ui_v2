import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Take_pic from "./Take_Picture";
import Bill_participants from "./Bill_participants";
import Upload_take_photo from "./Upload_take_photo";
import Manual_entry from "./Manual_entry";
import Splitting_Screen from "./Splitting_screen";
import Quick_split from "./Quick_split";
import Final_totals from "./Final_totals";
import Receipt_items from "./Receipt_items";
import CreateGroupStackNavigation from "../Group_stack/Navigation_create_group_stack";



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
            <SplitBillStack.Screen 
            name="Manual_entry"
            component={Manual_entry}
            />
            <SplitBillStack.Screen 
            name="Splitting_screen"
            component={Splitting_Screen}
            />
            <SplitBillStack.Screen 
            name="Quick_split"
            component={Quick_split}
            />
            <SplitBillStack.Screen 
            name="Final_Totals"
            component={Final_totals}
            />
            <SplitBillStack.Screen 
            name="Receipt_items"
            component={Receipt_items}
            />
        </SplitBillStack.Navigator>
    )
}


export default function SplitBillStackNavigation() {
    return (
        <SplitBillGroup/>
    )
}