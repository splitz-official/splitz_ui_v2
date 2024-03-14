import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'


const Camera_Button = ({onPress, IconComponent, title, button_style}) => {
  return (
    <TouchableOpacity activeOpacity={.5} onPress={onPress} style={[styles.button, button_style]}>
        {IconComponent}
        {title && <Text style={styles.title}>{title}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: 'white',
        // borderWidth: 2,
        // height: RFValue(40),
        // width: RFValue(40),
        // borderRadius: RFValue(20)
    },
    title: {
      marginTop: 5,
      color: 'white',
      fontSize: RFValue(10)
    }
})

export default Camera_Button