import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize"
import { useNavigation } from '@react-navigation/native';

import { RegularText, Bold700Text, Medium500Text } from '../../../Config/AppText';
import Screen from '../../../Components/Screen';
import TopLogo from '../../../Components/TopLogo';
import Owe_owed from './Components/Owe_owed';
import Split_bill_button from './Components/Split_bill_button';
import Join_create_buttons from './Components/Join_create_buttons';
import { useAxios } from '../../../Axios/axiosContext';
import Group_bills_switch from './Components/Group_bills_switch';
import Groups from './Components/Groups';
import Bills from './Components/Bills';
import { getBackgroundColorAsync } from 'expo-system-ui';
import Colors from '../../../Config/Colors';
import Large_green_button from '../../../Components/Large_green_button';
import SearchBar from '../../../Components/SearchBar';
import { scale } from 'react-native-size-matters';


function Home_screen(props) {
    console.log("Home Stack: Home_Screen");
    const { navigate } = useNavigation();
    const { userData } = useAxios();
    const userName = userData?.name;

    const [activeButton, setActiveButton] = useState('Groups');
    const [searchQuery, setSearchQuery] = useState('');
    
    const renderActiveComponent = () => {
        if (activeButton === 'Groups') {
            return <Groups searchQuery={searchQuery} />;
        } else if (activeButton === 'Bills') {
            return <Bills searchQuery={searchQuery} />;
        }
        return null;
    };

    return (
        <Screen style={{ backgroundColor: Colors.white }}>
            <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
                <TopLogo />
                {userName ? (
                    <Medium500Text style={styles.Welcometext}>Welcome Back, {`${userData.name.trim().split(' ')[0]}!`}</Medium500Text>
                ) : (
                    <Medium500Text style={styles.Welcometext}>Welcome Back!</Medium500Text>
                )}
                <Join_create_buttons />
                <SearchBar
                    placeholder="Find a group or bill!"
                    search_styles={styles.searchBar}
                    onSearchChange={setSearchQuery}
                />
                <Group_bills_switch 
                    onBillsPress={() => setActiveButton('Bills')} 
                    onGroupsPress={() => setActiveButton('Groups')} 
                    activeButton={activeButton} 
                />
                {renderActiveComponent()}
                <Large_green_button
                    title={"Quick Split"}
                    onPress={() => {
                        navigate("Split_bill_stack", {
                            screen: 'bill_participants',
                            params: { from: 'Home' }
                        });
                    }}
                />
            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    Welcometext: {
        paddingLeft: '5%',
        marginBottom: 5,
        fontSize: RFValue(14),
    },
    searchBar: {
        marginHorizontal: '5%',
        marginTop: scale(20),
    },
});

export default Home_screen;