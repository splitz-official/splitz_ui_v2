import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../Config/Colors'
import { RFValue } from 'react-native-responsive-fontsize'

const Green_button = ({children, onPress}) => {
  return (
    <TouchableOpacity
        style={styles.button}
        activeOpacity={.8}
        onPress={onPress}>
            <Text style={styles.buttontext}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        marginLeft: 20,
        marginVertical: 15,
        // paddingVertical: 15,
        height: RFValue(45),
        borderRadius: 10
    },
      buttontext: {
        fontSize: RFValue(15),
        fontFamily: 'DMSans_500Medium',
        color: Colors.white
      }
})

export default Green_button

