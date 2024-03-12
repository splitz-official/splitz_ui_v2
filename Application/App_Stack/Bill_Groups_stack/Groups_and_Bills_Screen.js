import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, FlatList, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import Screen from '../../../Components/Screen';
import Groups_Content from './Components/Groups_Content_component';
import Bills_Content from './Components/Bills_Content_Component';
import TopLogo from '../../../Components/TopLogo';
import SearchBar from '../../../Components/SearchBar';
import Colors from '../../../Config/Colors';
import Listitem from '../../../Components/ListItem';
import ListItemSeparator from '../../../Components/List_item_separator';
import ToggleButton from '../../../Components/Bill_Groups_buttons';


function Groups_and_Bills(props) {

    const [activeButton, setActiveButton] = useState('Groups');
    const renderContent = () => {
        switch (activeButton) {
            case 'Bills':
                return <Bills_Content/>; 
            case 'Groups':
                return <Groups_Content/>;
            default:
                return null;
        }
    };

    // const handleButtonPress = (buttonName) => {
    //     setActiveButton(buttonName);
    // };

    return (
        <Screen>
            <TopLogo/>
                <ToggleButton 
                    isBillActive={activeButton === 'Bills'} 
                    isGroupActive={activeButton === 'Groups'}
                    onBillPress={() => setActiveButton('Bills')}
                    onGroupPress={() => setActiveButton('Groups')}
                />
            {renderContent()}
            {/* <BottomNavigationBar/> */}
        </Screen>
    );
}



const styles = StyleSheet.create({
    
})

export default Groups_and_Bills;