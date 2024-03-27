import { Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../../../Config/Colors'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const Group_bills_switch = ({activeButton, onBillsPress, onGroupsPress}) => {

    // const [activeButton, setActiveButton] = useState('Groups');

  return (
    <View style={styles.container}>
        <View activeOpacity={1} style={styles.outter}>
            <View style={[styles.inner, activeButton == 'Bills' ? styles.innerRight : styles.innerLeft]}/>
            <View style={styles.textWrapper}>
                <TouchableOpacity activeOpacity={1} onPress={onGroupsPress} style={styles.label}>
                    <Text style={[styles.text, activeButton === 'Groups' ? {color: 'black'} : {color: 'white'}]}>My Groups</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={onBillsPress} style={styles.label}>
                    <Text style={[styles.text, activeButton === 'Bills' ? {color: 'black'} : {color: 'white'}]}>My Bills</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    outter: {
        width: '65%',
        height: RFPercentage(4),
        backgroundColor: Colors.primary,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0,
        position: 'relative'
    },
    textWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        position: 'absolute',
        alignItems: 'center',
    },  
    label: {
        // borderWidth: 2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: RFPercentage(3)
    },
    inner: {
        width: '50%',
        height: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        position: 'absolute'
    },
    innerRight: {
        right: 3
    },
    innerLeft: {
        left: 3
    },
    text: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(12)
    }
})

export default Group_bills_switch
