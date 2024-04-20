import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../../../../Config/Colors'

const Receipt_items_list_component = ({ name, price}) => {
  return (
    <TouchableOpacity style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 20,
        paddingHorizontal: scale(25),
        height: scale(50),
        minWidth: '100%',
        marginVertical: scale(5),
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
    }
})

export default Receipt_items_list_component
