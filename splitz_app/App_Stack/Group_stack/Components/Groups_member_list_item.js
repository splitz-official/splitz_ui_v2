import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'


import Colors from '../../../../Config/Colors'
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans'
import Profile_picture from '../../../../Components/Profile_picture'

const Groups_member_list_item = ({ title, subtitle, image }) => {
  return (
    <View style={styles.container}>
        {/* <View style={styles.picture}/> */}
        <Profile_picture name={title} image={image} sizing_style={styles.picture} text_sizing={{fontSize: RFValue(18)}}/>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: scale(10),
        // borderWidth: 1
    },
    picture: {
        width: scale(45),
        height: scale(45),
        borderColor: Colors.primary,
        borderWidth: 1
    },
    title: {
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(12),
        color: Colors.black,
        marginTop: scale(5)
    },
    subtitle: {
        fontFamily: 'DMSans_400Regular',
        fontSize: RFValue(10),
        color: Colors.textgray
    }
})

export default Groups_member_list_item
