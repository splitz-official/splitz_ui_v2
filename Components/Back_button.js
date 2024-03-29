import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../Config/Colors';

const Back_button = ({onPress, title}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        style={styles.container}
        activeOpacity={.8}
        >
        <MaterialIcons name="arrow-back-ios-new" size={RFValue(14)} color={Colors.primary} />
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginTop: 10,
        // borderWidth: 2,
    },
    text: {
        color: Colors.darkgreen,
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(12),
        marginLeft: 5
    }
})

export default Back_button
