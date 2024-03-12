import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Colors from '../Config/Colors'; 

const ToggleButton = ({ onBillPress, onGroupPress, isBillActive, isGroupActive }) => {
    return (
        <View style={styles.bill_groups_buttons}>
            <TouchableWithoutFeedback onPress={onBillPress}>
                <View style={isBillActive ? styles.activeButton : styles.inactiveButton}>
                    <Text style={isBillActive ? styles.activeText : styles.inactiveText}>Bills</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onGroupPress}>
                <View style={isGroupActive ? styles.activeButton : styles.inactiveButton}>
                    <Text style={isGroupActive ? styles.activeText : styles.inactiveText}>Groups</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
            
    );
};

const styles = StyleSheet.create({
    bill_groups_buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around',
        marginBottom: 5,
        height:50,
        paddingHorizontal: 65
    },
    activeText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal:10,
        paddingVertical: 5
    },
    inactiveText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    activeButton: {
        backgroundColor: Colors.primary,
        borderRadius: 100,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    inactiveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: 'white'
    },
});

export default ToggleButton;
