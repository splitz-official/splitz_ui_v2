import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../../../../Config/Colors'

const Receipt_add_item = ({ name, price, quantity,}) => {
  return (
    <View style={styles.container}>
        <TextInput style={[styles.input, {flex: 1.5}]}
        placeholder='Name'
        />
        <TextInput style={styles.input}/>
        <TextInput style={styles.input}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: Colors.button_fill_green,
        borderRadius: 20,
        paddingHorizontal: scale(25),
        height: verticalScale(40),
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
    input: {
        borderWidth: 1,
        flex: 1
    }
})

export default Receipt_add_item
