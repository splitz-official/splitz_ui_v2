import React, { useState } from 'react';
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
import { useAxios } from '../../../Axios/axiosContext';
import Group_bills_switch from './Components/Group_bills_switch';
import Groups from './Components/Groups';
import Bills from './Components/Bills';
import { getBackgroundColorAsync } from 'expo-system-ui';
import Colors from '../../../Config/Colors';


function Home_screen(props) {
    console.log("Home Stack: Home_Screen")
    const { navigate } = useNavigation();
    const { userData } = useAxios();
    const userName = userData?.name;

    const [activeButton, setActiveButton] = useState('Groups');
    const [activeOption, setActiveOption] = useState('A')
    

    const renderActiveComponent = () => {
        switch (activeButton) {
            case 'Groups':
                return <Groups />;
            case 'Bills':
                //will add bills component soon
                return <Bills/>;
            default:
                return null; 
        }
    };

    return (
        <Screen style={{backgroundColor: Colors.white}}>
            <View style={{flex:1}}>
                <TopLogo/>
                {userName ? <Medium500Text style={styles.Welcometext}>Welcome Back, {`${userData.name.trim().split(' ')[0]}!`}</Medium500Text>
                    : <Medium500Text style={styles.Welcometext}>Welcome Back!</Medium500Text> 
                }
                {/* <Owe_owed/> */}
                <Join_create_buttons/>
                <Group_bills_switch onBillsPress={()=> setActiveButton('Bills')} onGroupsPress={()=> setActiveButton('Groups')} activeButton={activeButton}/>
                {renderActiveComponent()}
                <Split_bill_button
                onPress={() => {
                    console.log("Split Pressed");
                    navigate("Split_bill_stack", {
                        screen: 'bill_participants',
                        params: {from: 'Home'}
                })
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