import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'

import { MaterialIcons } from '@expo/vector-icons';

import Colors from '../../../../Config/Colors'

const Receipt_items_list_component = ({ name, price, quantity, onPress, isSelected, participants, editing}) => {

    const truncate = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    };

  return (
    <TouchableOpacity activeOpacity={.8} style={[styles.container, isSelected ? styles.selected : {}]} onPress={onPress}>
        {/* <View style={{position: 'absolute', right: 2}}>
            <MaterialIcons name="cancel" size={scale(16)} color="gray" />
        </View> */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.checkbox, isSelected ? styles.selectedbox: {}]}/>
            <Text numberOfLines={1} style={styles.name}>{truncate(name, 18)} {quantity}</Text>
        </View>
        <Text style={styles.price}>{price.toFixed(2)}</Text>
        <Text style={styles.participants}>selected by: {participants}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: scale(15),
        paddingHorizontal: scale(25),
        height: verticalScale(45),
        maxWidth: '100%',
        minWidth: '100%',
        marginVertical: verticalScale(3),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(14),
        // borderWidth: 1
    },
    price: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(22),
        // borderWidth: 1
    },
    selected: {
        backgroundColor: Colors.button_fill_green
    },
    checkbox: {
        borderWidth: 1,
        height: scale(12),
        width: scale(12),
        borderRadius: scale(2),
        marginRight: scale(15)
    },
    selectedbox: {
        backgroundColor: Colors.primary
    },
    participants: {
        position: 'absolute',
        bottom: 0,
        left: '10%',
        fontFamily: 'DMSans_400Regular',
        fontSize: RFValue(10),
        color: Colors.textgray
    }
})

export default Receipt_items_list_component
