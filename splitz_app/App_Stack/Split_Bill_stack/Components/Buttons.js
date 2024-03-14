import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { Children } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'


const Button = ({onPress, IconComponent, title, button_style, Children}) => {
  return (
    <TouchableOpacity activeOpacity={.5} onPress={onPress} style={[styles.button, button_style]}>
        {IconComponent && IconComponent}
        {Children}
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

export default Button