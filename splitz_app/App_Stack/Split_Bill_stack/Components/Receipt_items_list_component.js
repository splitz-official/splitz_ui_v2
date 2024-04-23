import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../../../../Config/Colors'

const Receipt_items_list_component = ({ name, price, quantity, onPress, isSelected, participants}) => {
  return (
    <TouchableOpacity activeOpacity={.8} style={[styles.container, isSelected ? styles.selected : {}]} onPress={onPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.checkbox, isSelected ? styles.selectedbox: {}]}/>
            <Text style={styles.name}>{name} {quantity}</Text>
        </View>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.participants}>{participants}</Text>
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
        minWidth: '100%',
        marginVertical: verticalScale(3),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    name: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(14)
    },
    price: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(22),
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
