import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize"
import { useNavigation } from '@react-navigation/native';

import { RegularText, Bold700Text, Medium500Text } from '../../../Config/AppText';
import Screen from '../../../Components/Screen';
import TopLogo from '../../../Components/TopLogo';
import Owe_owed from './Components/Owe_owed';
import Split_bill_button from './Components/Split_bill_button';
import Join_create_buttons from './Components/Join_create_buttons';
import Activity_list from './Components/Activity_list';
import Placecholder_list from './Components/Placeholder_list';


function Home_screen(props) {

    const { navigate } = useNavigation();

    return (
        <Screen>
            <View style={{flex:1}}>
                <TopLogo/>
                <Medium500Text style={styles.Welcometext}>Welcome Back, Rainer</Medium500Text> 
                <Owe_owed/>
                <Join_create_buttons/>
                <Placecholder_list />
                <Split_bill_button
                onPress={() => {
                    console.log("Split Pressed");
                    navigate("Split_bill_stack")
                }}/>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    Welcometext: {
        paddingLeft: '5%',
        marginBottom: 5,
        fontSize: RFValue(14),
    },
})
export default Home_screen;