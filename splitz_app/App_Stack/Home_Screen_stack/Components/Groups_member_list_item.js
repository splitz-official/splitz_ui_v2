import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'


import Colors from '../../../../Config/Colors'
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans'

const Groups_member_list_item = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
        <View style={styles.picture}/>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: scale(10)
    },
    picture: {
        width: scale(45),
        height: scale(45),
        borderWidth: 1,
        borderRadius: scale(22.5),
        borderColor: Colors.primary
    },
    title: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(14),
        color: Colors.black,
        marginTop: scale(5)
    },
    subtitle: {
        fontFamily: 'DMSans_400Regular'
    }
})

export default Groups_member_list_item