import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import Colors from '../Config/Colors'

const Large_green_button = ({onPress, title}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} activeOpacity={.8} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        paddingVertical: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        borderRadius: 25,
        marginHorizontal: 10,
        flex: 1,
    },
    text: {
        color: Colors.white,
        fontSize: RFValue(18),
        paddingVertical: 10,
        fontFamily: 'DMSans_700Bold'
    }, 
})

export default Large_green_button
