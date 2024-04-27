import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../Config/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import { scale } from 'react-native-size-matters'

const Green_button = ({children, onPress, buttonstyle}) => {
  return (
    <TouchableOpacity
        style={[styles.button, buttonstyle]}
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
        alignSelf: "center",
        marginTop: scale(40),
        width: scale(320),
        height: scale(45),
        borderRadius: 10,
    },
      buttontext: {
        fontSize: RFValue(15),
        fontFamily: 'DMSans_500Medium',
        color: Colors.white
      }
})

export default Green_button

